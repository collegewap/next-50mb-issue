import Head from 'next/head'
import CustomLink from 'next/link'

export const Home = (): JSX.Element => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <CustomLink href="/posts/first-post">First post</CustomLink>
      </div>
      <div>hello</div>
    </div>
  )
}

export default Home
