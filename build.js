const packager = require('electron-packager')
const pkg = require('./package.json')

packager({
  dir: __dirname,
  prune: true,
  name: pkg.productName,
  arch: 'x64',
  platform: 'darwin',
  appCategoryType: 'public.app-category.music',
  out: `${__dirname}/build`,
})
