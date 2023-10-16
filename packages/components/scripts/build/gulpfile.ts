import { parallel, series } from 'gulp'
import { buildFull, buildModules, buildStyle, cleanup, generateTypes } from './task'
import { buildResolver } from './task/build-resolver'

export default series(cleanup, parallel(buildModules, buildFull, buildStyle, buildResolver, generateTypes))
