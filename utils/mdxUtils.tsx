import fs from 'fs'
import path from 'path'
import klawSync from 'klaw-sync'
import { CoverImage, PostPath } from '../lib/types'
import jimp from 'jimp'
import sizeOf from 'image-size'

const coverImageData: { slug: string; url: string; coverImage: CoverImage }[] =
  []

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts')

export const PUBLIC_URL = 'public'

const metaDataPath = path.join(process.cwd(), 'all-posts.json')

export const getPostFilePaths = async (): Promise<PostPath[]> => {
  const postFilePaths = klawSync(POSTS_PATH, { nodir: true })
    // Only include md(x) files
    .filter((item) => /\.mdx?$/.test(item.path))
    .map((item) => ({
      path: item.path,
      slug: path.basename(item.path).replace(/\.mdx?$/, ''),
    }))

  // Need to store in a file again due to https://github.com/vercel/next.js/discussions/11272
  fs.writeFileSync(metaDataPath, JSON.stringify(postFilePaths))
  return postFilePaths
}

export const readPostFilePaths = (): PostPath[] => {
  return JSON.parse(fs.readFileSync(metaDataPath).toString())
}

export const getCoverImageDetails = async (
  url: string,
  title: string,
  slug: string
): Promise<CoverImage> => {
  const savedData = coverImageData.find((item) => item.url === url)
  if (savedData) {
    return savedData.coverImage
  }
  const fullPath = path.resolve(process.cwd(), PUBLIC_URL, './' + url)
  const dimensions = sizeOf(fullPath)
  const { width, height } = dimensions
  const image = await jimp.read(fullPath)
  const resized = image.resize(50, jimp.AUTO)
  const base64 = await resized.getBase64Async(jimp.MIME_JPEG)
  const coverImage = {
    width,
    height,
    src: url,
    blurDataURL: base64,
    alt: title,
  }
  coverImageData.push({ slug, url, coverImage })
  return coverImage
}
