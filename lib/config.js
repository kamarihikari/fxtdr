const { env } = process
const configuration = {
  LOG_LEVEL: env['LOG_LEVEL'] || 'info',
}

export default configuration
