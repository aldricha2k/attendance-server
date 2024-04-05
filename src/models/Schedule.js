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
    name: {
        type: String,
    },
    perscode: {
        type: String
    },
    max_slot:{
        type: Number
    },
    taken_slot:{
        type: Number,
        default: 0
    },
    attendees: [{
        name: String,
        perscode: String,
        chosen_slot: Number
    }]
});

  mongoose.model('Schedule', scheduleSchema);
  