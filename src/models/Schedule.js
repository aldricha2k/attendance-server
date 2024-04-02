const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
        title: {
            type: String,
        },
        facility:{
            type: String,
        },
        summary: {
            type: String,
        },
        date: {
            type: String,
        },
        start: {
            type: String
        },
        end: {
            type: String
        },
        perscode: {
            type: String
        }
  });

  mongoose.model('Schedule', scheduleSchema);
  