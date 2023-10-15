import { parallel, series } from 'gulp'
import { buildFull, buildModules, cleanup, generateTypes } from './task'

export default series(cleanup, parallel(buildModules, buildFull, generateTypes))
