const config = require('../config/config');
const cron = require('node-cron');
const core = require('./infoController');

let task;

exports.getTask = () => task;
exports.startTask = () => {
    let sec = config.server.refreshRate;
    if (sec < 1 ) sec = 10;
    core();
    task = cron.schedule(`*/${sec} * * * * *`, () => {
        core();
    });
};

exports.destroyTask = () => {
    if (task) {
        task.destroy();
        task = null;
    }
};