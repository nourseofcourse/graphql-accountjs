'use strict'

const CronJob = require('cron').CronJob
const notificationsWorker = require('./workers/notificationsWorker')
const moment = require('moment')

const schedulerFactory = () => {
  return {
    start() {
      new CronJob('00 * * * * *', () => {
        console.log('Running send Notifications Worker for ' +
          moment().format())
          notificationsWorker.run()
      }, null, true, '')
    }
  }
}

module.exports = schedulerFactory()