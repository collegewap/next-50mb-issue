import { Message } from 'esbuild'
import matter from 'gray-matter'

export type frontMatter = {
  title: string
  description: string
  image: string
  author: string
  date: string
  category: string
  slug: string
}
export type MdxProps = {
  props: {
    source: string
    frontMatter: frontMatter
    coverImage: CoverImage
    timeToRead: number
  }
}
export type SlugParams = {
  slug: string
}

export type PathProps = {
  paths: { params: SlugParams }[]
  fallback: boolean
}

export type HeaderProps = {
  title: string
  description: string
  children: JSX.Element
}

export type PostPath = {
  path: string
  slug: string
}

export type MenuItem = {
  href: string
  title: string
}[]

export type CoverImage = {
  width: number
  height: number
  src: string
  blurDataURL: string
  alt: string
}
export type Category = {
  name: string
  slug: string
}

export type RelatedPost = {
  title: string
  slug: string
  coverImage: CoverImage
  timeToRead: number
  categoryDetails: Category
}

export type MdxData = {
  code: string
  frontmatter: {
    [key: string]: any
  }
  errors: Message[]
  matter: matter.GrayMatterFile<any>
}
