import React, { ReactNode } from 'react'
import BlogCover from '../components/blog/BlogCover'

const BlogLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <article className="">
      <BlogCover />
      <div className="px-6 relative">{children}</div>
    </article>
  )
}

export default BlogLayout
