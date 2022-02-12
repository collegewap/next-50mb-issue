import fs from 'fs'
import path from 'path'
import klawSync from 'klaw-sync'
export const POSTS_PATH = path.join(process.cwd(), 'posts')
const metaDataPath = path.join(process.cwd(), 'all-posts.json')

const postFilePaths = klawSync(POSTS_PATH, { nodir: true })
  // Only include md(x) files
  .filter((item) => /\.mdx?$/.test(item.path))
  .map((item) => ({
    path: item.path,
    slug: path.basename(item.path).replace(/\.mdx?$/, ''),
  }))

// Need to store in a file again due to https://github.com/vercel/next.js/discussions/11272
fs.writeFileSync(metaDataPath, JSON.stringify(postFilePaths))
