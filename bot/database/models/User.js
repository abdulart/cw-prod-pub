import mongoose from '../index.js';
import userSettingsSchema from './UserSettings.js';


const userSchema = new mongoose.Schema({
    name: String,
    u_id: Number,
    nickname: String,
    settings: {type: userSettingsSchema, default: {
        receiving_messages: true,
        time_interval: 0,
        word_per_day: 5,
        ed_level: 1,
        timezone: -999,
    }},
    seen_words: {type: [Number], default: []}
});


const User = mongoose.model('User', userSchema);
export default User;