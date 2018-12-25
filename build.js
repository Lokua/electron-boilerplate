const { execSync } = require('child_process')
const { writeFileSync } = require('fs')
const packager = require('electron-packager')
const pkg = require('./package.json')

build()

async function build() {
  prepareSourceFiles()
  await packageApp()
  cleanUp()
}

function prepareSourceFiles() {
  execSync('rm -rf tmp && mkdir tmp')
  execSync('npx babel src --out-dir tmp')
  execSync('cp src/index.html tmp/index.html')
  execSync('cp -r node_modules tmp/node_modules')
  writeFileSync(
    './tmp/package.json',
    JSON.stringify(Object.assign({}, pkg, { main: './index.js' }), null, 2),
    'utf-8'
  )
}

function packageApp() {
  return packager({
    dir: `${__dirname}/tmp`,
    prune: true,
    name: pkg.productName,
    arch: 'x64',
    platform: 'darwin',
    appCategoryType: 'public.app-category.music',
    out: `${__dirname}/build`,
  })
}

function cleanUp() {
  execSync('rm -rf tmp')
}
