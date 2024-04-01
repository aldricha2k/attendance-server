const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    date: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        title: {
            type: String,
        },
        summary: {
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
    }
  });

  mongoose.model('Schedule', scheduleSchema);
  