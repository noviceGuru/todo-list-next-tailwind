import { setupServer } from 'msw/node'
import { handlers } from './testApiHandlers'

export const mswServer = setupServer(...handlers)