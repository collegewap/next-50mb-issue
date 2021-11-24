import Image from 'next/image'
import React, { useContext } from 'react'
import BlogContext from '../../context/BlogContext'
const BlogCover = (): JSX.Element => {
  const blogContext = useContext(BlogContext)
  const {
    coverImage: { src, alt, blurDataURL },
  } = blogContext

  return (
    <div className="max-w-xl lg:max-w-2xl m-auto flex pt-0 lg:pt-6  lg:px-6 px-0 lg:py-12 py-6 lg:flex-row flex-col items-center">
      <div className="lg:h-[335px] sm:h-80 h-64 relative z-[2]  w-full lg:rounded-md overflow-hidden">
        <Image
          src={src}
          alt={alt}
          priority
          sizes="
            (min-width: 3840px) 14vw,
            (min-width: 2048px) 26vw,
            (min-width: 1920px) 28vw,
            (min-width: 1200px) 44vw,
            (min-width: 1080px) 54vw,
            (min-width: 828px) 70vw,
            (min-width: 750px) 77vw,
            (min-width: 640px) 90vw, 100vw"
          blurDataURL={blurDataURL}
          layout="fill"
          objectFit="cover"
          placeholder={`${blurDataURL ? 'blur' : 'empty'}`}
        />
      </div>
    </div>
  )
}

export default BlogCover
