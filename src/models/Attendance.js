const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    perscode: {
        type: String,
    },
    name: {
        type: String,
    },
    time_in: {
        type: String,
    },
    time_out: {
        type: String,
        default: ''
    },
    date: {
        type: String,
    },
    week: {
        type: String,
    },
    week_counter: {
        type: Number,
    },
    month_year: {
        type: String,
    },
    absent: {
        type: Boolean,
    },
    deduction: {
        type: Number,
        default: ''
    }
});

mongoose.model('Attendance', AttendanceSchema);
