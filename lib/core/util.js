import config from '../config.js'
import pino from 'pino'
import hertzy from 'hertzy'

const { LOG_LEVEL } = config
const logger = pino({ level: LOG_LEVEL })
const events = hertzy.tune('core')

function createLogger(logName, scope = 'core') {
  const child = logger.child({ logId: `fxtdr::${scope}:${logName}` })
  const _debug = child.debug
  const _info = child.info

  child.debug = function debug() {
    events.emit('log', {
      id: `fxtdr::${scope}:${logName}`,
      event: 'log:debug',
      data: [...arguments],
    })

    return _debug.apply(this, [...arguments])
  }

  child.info = function info() {
    events.emit('log', {
      id: `fxtdr::${scope}:${logName}`,
      event: 'log:info',
      data: [...arguments],
    })

    return _info.apply(this, [...arguments])
  }

  return logName ? child : logger
}

function createEventBus(eventBusName) {
  const bus = hertzy.tune(eventBusName)
  const event = bus.emit

  event.on = bus.on
  event.emit = function emit(name, data) {
    events.emit('event', { id: eventBusName, event: name, data })
    return bus.emit(name, data)
  }

  return event
}

export default { createLogger, events, createEventBus }
