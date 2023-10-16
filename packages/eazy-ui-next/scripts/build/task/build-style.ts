import { dest, src } from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import { compRoot, output, outputCjs, outputEsm } from '../../utils/paths'

/**
 * [src/*.scss] to [es/*.scss, lib/*.scss]
 */
async function buildScssCopy() {
  await new Promise((resolve) => {
    src(`${compRoot}/**/*.scss`)
      .pipe(dest(outputEsm))
      .pipe(dest(outputCjs))
      .on('end', resolve)
  })
}

/**
 * [src/**\/style/*.scss] to [es/**\/style/*.css, lib/**\/style/*.css]
 */
async function buildScssModules() {
  const sass = gulpSass(dartSass)
  await new Promise((resolve) => {
    src(`${compRoot}/**/style/*.scss`)
      .pipe(sass.sync())
      .pipe(autoprefixer({ cascade: false }))
      .pipe(cleanCSS())
      .pipe(dest(outputEsm))
      .pipe(dest(outputCjs))
      .on('end', resolve)
  })
}

/**
 * [src/*.scss] to [dist/*.css]
 */
async function buildScssFull() {
  const sass = gulpSass(dartSass)
  await new Promise((resolve) => {
    src(`${compRoot}/*.scss`)
      .pipe(sass.sync())
      .pipe(autoprefixer({ cascade: false }))
      .pipe(cleanCSS())
      .pipe(dest(output))
      .on('end', resolve)
  })
}

/**
 * [src/**\/style/*.ts] to [es/**\/style/*.js, lib/**\/style/*.js]
 */
async function buildStyleModules() {
  await new Promise<void>((resolve) => {
    Promise.all([
      new Promise((r) => {
        src(`${compRoot}/**/style/*.ts`)
          .pipe(dest((file) => {
            file.path = file.path.replace('src', 'es').replace('.ts', '.mjs')
            return outputEsm
          }))
          .on('end', r)
      }),
      new Promise((r) => {
        src(`${compRoot}/**/style/*.ts`)
          .pipe(dest((file) => {
            file.path = file.path.replace('src', 'lib').replace('.ts', '.js')
            return outputEsm
          }))
          .on('end', r)
      }),
    ]).then(() => {
      resolve()
    })
  })
}

export async function buildStyle() {
  await Promise.all([
    buildScssCopy(),
    buildScssModules(),
    buildScssFull(),
    buildStyleModules(),
  ])
}
