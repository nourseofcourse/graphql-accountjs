'use strict'

import { Workshop } from '../modules/workshop/model'

const notificationWorkerFactory = () => {
  return {
    run() {
      Workshop.sendNotifications()
    }
  }
}

module.exports = notificationWorkerFactory()