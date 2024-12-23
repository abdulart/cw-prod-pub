import { Agenda } from '@hokify/agenda';
import User from '../database/models/User.js';
import {getRandomUsersWord, botSendWord} from './words.js';
import {TIME_INTERVALS} from '../constants.js';

const agenda = new Agenda({ db: { address: process.env.AGENDA_URL } });


// function calculateSendTimes(startHour, endHour, words_per_day) {
//     // Convert hours to minutes
//     const totalMinutes = (endHour - startHour) * 60;
//
//     // Calculate interval between words
//     const interval = Math.floor(totalMinutes / words_per_day);
//
//     // Generate timestamps
//     const sendTimes = [];
//     for (let i = 0; i < words_per_day; i++) {
//         const time = startHour * 60 + i * interval; // Minutes from start of day
//         const hours = Math.floor(time / 60);
//         const minutes = time % 60;
//         sendTimes.push({ hours, minutes });
//     }
//     return sendTimes;
// }


agenda.define('send word to user', async (job) => {
    const { userId } = job.attrs.data;
    const user = await User.findOne({ u_id: userId });

    if (!user) {
        console.log(`User ${userId} not found`);
        return;
    }

    const random_word = await getRandomUsersWord(userId)
    // await botSendWord(bot, userId, random_word)
})


export const scheduleTodayWords = async () => {
    console.log("Scheduling today's word deliveries...");

    const users = await User.find({});
    const today = new Date();

    users.forEach((user) => {
        const user_time_from = TIME_INTERVALS[user.settings.time_interval]['from']
        const user_time_to = TIME_INTERVALS[user.settings.time_interval]['to']
        const sendTimes = calculateSendTimes(user_time_from, user_time_to, user.settings.word_per_day);

        sendTimes.forEach((time) => {
            // Set the exact send time for today
            const sendDate = new Date(today);
            sendDate.setHours(time.hours, time.minutes, 0, 0);

            const now = new Date();
            const delay = sendDate - now;

            if (delay > 0) {
                // Schedule the job for exactly that time
                agenda.schedule(sendDate, 'send word to user', { userId: user.u_id });
                console.log(`Scheduled one-time delivery for User ${user.u_id} at ${sendDate}`);
            }
        });
    });

    console.log("Today's word deliveries have been scheduled.");
}