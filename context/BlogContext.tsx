import React from 'react'
import { CoverImage, frontMatter } from '../lib/types'

const BlogContext = React.createContext(
  {} as {
    frontMatter: frontMatter
    coverImage: CoverImage
    timeToRead: number
  }
)

export default BlogContext
