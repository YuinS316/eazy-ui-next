import { parallel, series } from 'gulp'
import { buildModules, cleanup, generateTypes } from './task'

export default series(cleanup, parallel(buildModules, generateTypes))
