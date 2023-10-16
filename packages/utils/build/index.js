/* eslint-disable no-console */
const fs = require('node:fs')
const path = require('node:path')
const { build } = require('esbuild')

async function main() {
  await build(
    {
      bundle: true,
      outdir: 'lib',
      platform: 'browser',
      format: 'esm',
      entryPoints: ['./index.ts'],
    },
  )

  const sourcePath = path.resolve(__dirname, '../', 'package.json')
  const destPath = path.resolve(__dirname, '../', 'lib', 'package.json')
  copyFile(sourcePath, destPath)
}

/**
 * 复制package.json
 *
 * @param {*} source
 * @param {*} destination
 */
function copyFile(source, destination) {
  // 创建可读流
  const readStream = fs.createReadStream(source)

  // 创建可写流
  const writeStream = fs.createWriteStream(destination)

  // 使用管道将读取的内容写入到目标文件
  readStream.pipe(writeStream)

  // 当读取流结束时，关闭写入流
  readStream.on('end', () => {
    console.info('File copied successfully!')
    writeStream.end()
  })

  // 处理错误
  readStream.on('error', (err) => {
    console.error('Error reading the file:', err)
  })

  writeStream.on('error', (err) => {
    console.error('Error writing the file:', err)
  })
}

main()
