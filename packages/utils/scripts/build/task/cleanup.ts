import { rimraf } from 'rimraf'
import { output, outputCjs, outputEsm } from '../../utils/paths'

/**
 * 清理旧的打包文件
 */
export async function cleanup() {
  await rimraf([output, outputCjs, outputEsm])
}
