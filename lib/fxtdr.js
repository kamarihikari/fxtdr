/**
 * FUNCTIONAL TRADER PLATFORM
 */
import config from './config.js'
import core from './core/index.js'

const context = {
  env: process.env,
  metadata: {},
  config,
}

export default {
  start(context) {},
  stop() {},
}
