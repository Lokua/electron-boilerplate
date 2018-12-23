const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const rimraf = require('rimraf')
const c = require('chalk')
const electronPackager = require('electron-packager')
const pkg = require('../package.json')

const rmdir = promisify(rimraf)
const writeFile = promisify(fs.writeFile)
const copy = promisify(fs.copyFile)
const mkdir = promisify(fs.mkdir)

const paths = {
  src: path.join(__dirname, '../src'),
  tmp: path.join(__dirname, '../tmp'),
  build: path.join(__dirname, '../build')
}

main()

async function main() {
  const start = Date.now()
  await clean()
  await ensureDirs()
  await copySourceFiles()
  await buildElectronOsx()
  await rmdir(paths.tmp)
  console.info(c.green(`done in ${Date.now() - start}ms`))
}

function clean() {
  return Promise.all([rmdir(paths.tmp), rmdir(paths.build)])
}

async function ensureDirs() {
  await mkdir(paths.tmp)
  await mkdir(paths.build)
}

function copySourceFiles() {
  return Promise.all([
    copyPackageJson(),
    copy(path.join(paths.src, 'index.js'), path.join(paths.tmp, 'index.js')),
    copy(
      path.join(paths.src, 'index.html'),
      path.join(paths.tmp, 'index.html')
    )
  ])
}

function copyPackageJson() {
  const updated = Object.assign({}, pkg, {
    main: './index.js'
  })

  return writeFile(
    path.join(paths.tmp, 'package.json'),
    JSON.stringify(updated, null, 2),
    'utf-8'
  )
}

function buildElectronOsx() {
  return electronPackager({
    dir: paths.build,
    prune: true,
    name: pkg.productName,
    arch: 'x64',
    platform: 'darwin',

    // https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW8
    appCategoryType: 'public.app-category.music',

    out: paths.build,
    // icon: path.join(paths.src, 'resources/mac/midi-1024.png.icns'),
  })
}