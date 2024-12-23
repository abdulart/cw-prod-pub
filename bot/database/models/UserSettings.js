import mongoose from '../index.js';


export const userSettingsSchema = new mongoose.Schema({
    receiving_messages: {type: Boolean, default: true},
    // receive_from: {type: Number, default: 9},
    // receive_to: {type: Number, default: 21},
    time_interval: {type: Number, default: 0},
    word_per_day: {type: Number, default: 5},
    ed_level: {type: Number, default: 1},
    timezone: {type: Number, default: -999},
});


export default userSettingsSchema;