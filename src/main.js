import { web } from "./app/web.js"
import { logger } from "./app/logging.js"

web.listen(4000, () => {
    logger.info('App start...')
})
