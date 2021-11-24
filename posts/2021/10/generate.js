const fs = require('fs')
filenames = fs.readdirSync(__dirname)

var ncp = require('ncp').ncp

function replaceAll(string, search, replace) {
  return string.split(search).join(replace)
}

ncp.limit = 16

for (let i = 1; i < 200; i++) {
  const slug = 'next-post-' + Number(i + 2)
  ncp('first-post', slug, function (err) {
    if (err) {
      return console.error(err)
    }
    fs.renameSync(slug + '/first-post.mdx', slug + '/' + slug + '.mdx')
    let contents = fs.readFileSync(slug + '/' + slug + '.mdx', 'utf-8')
    contents = replaceAll(contents, 'first-post/', slug + '/')
    fs.writeFileSync(slug + '/' + slug + '.mdx', contents)
    console.log('done!')
  })
  ncp(
    '../../../public/img/posts/first-post/',
    '../../../public/img/posts/' + slug,
    function (err) {
      if (err) {
        return console.error(err)
      }
      console.log('done!')
    }
  )
}
