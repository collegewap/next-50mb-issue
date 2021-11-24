import fs from 'fs'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import { useRemoteRefresh } from 'next-remote-refresh/hook'
import { useRouter } from 'next/router'
import path from 'path'
import React from 'react'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import remarkMdxImages from 'remark-mdx-images-advanced'
import BlogContext from '../../context/BlogContext'
import BlogLayout from '../../layouts/blog'
import type {
  CoverImage,
  frontMatter,
  MdxProps,
  PathProps,
  SlugParams,
} from '../../lib/types'
import {
  getCoverImageDetails,
  getPostFilePaths,
  PUBLIC_URL,
  readPostFilePaths,
} from '../../utils/mdxUtils'

export default function PostPage({
  source,
  frontMatter,
  coverImage,
  timeToRead,
}: {
  source: string
  frontMatter: frontMatter
  coverImage: CoverImage
  timeToRead: number
}): JSX.Element {
  const Component = React.useMemo(() => getMDXComponent(source), [source])
  const router = useRouter()

  useRemoteRefresh({
    shouldRefresh: (path) => path.includes(router.query.slug),
  })
  return (
    <BlogContext.Provider
      value={{
        frontMatter,
        coverImage,
        timeToRead,
      }}
    >
      <BlogLayout>
        {/* Moving main to BlogLayout breaks prose combined with JIT! */}
        <main
          className="max-w-[700px] m-auto lg:mt-8 prose dark:prose-dark w-full"
          id="main"
        >
          <Component />
        </main>
      </BlogLayout>
    </BlogContext.Provider>
  )
}

export const getStaticProps = async ({
  params,
}: {
  params: SlugParams
}): Promise<MdxProps> => {
  const postFilePaths = readPostFilePaths()
  const postFilePath = postFilePaths.find((item) => item.slug === params.slug)
  const source = fs.readFileSync(postFilePath.path)

  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }

  const result = await bundleMDX(source.toString(), {
    cwd: path.dirname(postFilePath.path),
    xdmOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        [
          remarkMdxImages,
          {
            dir: path.dirname(postFilePath.path),
            publicDir: path.resolve(process.cwd(), PUBLIC_URL),
          },
        ],
        [remarkGfm],
      ]

      return options
    },
    esbuildOptions: (options) => {
      options.outdir = path.join(
        process.cwd(),
        'public/img/generated',
        params.slug
      )
      options.loader = {
        ...options.loader,
        '.jpg': 'file',
        '.png': 'file',
        '.gif': 'file',
      }
      options.publicPath = `/img/generated/${params.slug}`
      options.write = true

      return options
    },
  })

  const { title, description, image, author, category } = result.frontmatter
  const coverImage = await getCoverImageDetails(
    result.frontmatter.image,
    title,
    params.slug
  )

  const timeToRead = readingTime(result.matter.content)
  return {
    props: {
      source: result.code,
      frontMatter: {
        ...result.frontmatter,
        title,
        description,
        image,
        author,
        category,
        slug: params.slug,
        date: result.frontmatter.date.toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      },
      coverImage,
      timeToRead: timeToRead.minutes,
    },
  }
}

export const getStaticPaths = async (): Promise<PathProps> => {
  const postFilePaths = await getPostFilePaths()
  // Map the path into the static paths object required by Next.js
  const paths = postFilePaths.map((item) => ({ params: { slug: item.slug } }))

  return {
    paths,
    fallback: false,
  }
}
