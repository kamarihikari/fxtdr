import config from '../config.js'
import util from './util.js'
import services from './services/index.js'

const { createLogger, events, createEventBus } = util

const log = createLogger('init')

events.on('event', console.dir)

function registerService(service) {
  const { name, start, stop } = service
  log.debug(`Registering Service: ${name}`)

  const errorHandler = (error) => {}

  const event = createEventBus(`service:${name.toLowerCase()}`)
  event.on('error', errorHandler)

  const context = {
    core: { events },
    log: createLogger(name.toLowerCase(), 'service'),
    event,
    config,
  }

  event.emit('error', new Error('test'))
}

/**
 * Core Service
 * - Initialize Base to establish context for DI
 * - { logging, events, }
 */

registerService(services[1])

export default {}
