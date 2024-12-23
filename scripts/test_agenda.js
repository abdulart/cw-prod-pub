import 'dotenv/config'
import { Agenda } from '@hokify/agenda';

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

agenda.define('ebosh', async (job) => {
    console.log('pizda')
})


export const scheduleTodayWords = async () => {
    console.log("Scheduling today's word deliveries...");

    const sendTimes = calculateSendTimes(14, 15, 60);
    const today = new Date();

    sendTimes.forEach((time) => {
        // Set the exact send time for today
        const sendDate = new Date(today);
        sendDate.setHours(time.hours, time.minutes, 0, 0);

        const now = new Date();
        const delay = sendDate - now;

        if (delay > 0) {
            // Schedule the job for exactly that time
            (async function () {
                await agenda.start()
                await agenda.schedule(sendDate, 'ebosh');
            })();
            console.log(`Scheduled one-time delivery at ${sendDate}`);
        }
    });

    console.log("Today's word deliveries have been scheduled.");
}


scheduleTodayWords()