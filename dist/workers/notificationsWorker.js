'use strict';

var _model = require("../modules/workshop/model");

const notificationWorkerFactory = () => {
  return {
    run() {
      _model.Workshop.sendNotifications();
    }

  };
};

module.exports = notificationWorkerFactory();