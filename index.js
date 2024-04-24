import './register.js'
import fxtdr from './lib/fxtdr.js'
;(function FXTDR_MAIN() {
  process.on('uncaughtException', (error) => fxtdr.stop({ error }))
  process.on('unhandledRejection', (error) => fxtdr.stop({ error }))
  process.on('beforeExit', (code) => fxtdr.stop({ code }))

  fxtdr.start()
})()
