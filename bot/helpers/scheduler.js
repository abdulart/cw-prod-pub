import cron from 'node-cron'
import { botSendRandomTaskWord } from './words.js'
import {TIME_INTERVALS} from '../constants.js';
import User from "../database/models/User.js";
import WordTask from "../database/models/WordTask.js";


export const scheduleAll = async (bot) => {
    const calculateSendTimesForUser = (startHour, endHour, words_per_day, userId) => {
        // Convert hours to minutes
        const totalMinutes = (endHour - startHour) * 60;

        // Calculate interval between words
        const interval = Math.floor(totalMinutes / (words_per_day+1));

        // Generate timestamps
        const sendTimes = [];
        for (let i = 1; i <= words_per_day; i++) {
            const time = startHour * 60 + i * interval; // Minutes from start of day
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            sendTimes.push({date: generateDate(minutes, hours), u_id: userId});
        }
        return sendTimes;
    }


    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    const generateDate = (minute, hour) => {
        const genDate = new Date();
        genDate.setHours(hour);
        genDate.setMinutes(minute);
        return genDate
    }


    const scheduleDailySends = async () => {
        try {
            const users = await User.find({});
            let insertList = [];
            users.forEach(user => {
                if (user.settings.receiving_messages) {
                    const userHoursObject = TIME_INTERVALS[user.settings.time_interval];
                    const userSendTimes = calculateSendTimesForUser(userHoursObject['from'], userHoursObject['to'], user?.settings?.word_per_day, user['u_id']);
                    // console.log(userSendTimes)
                    insertList = insertList.concat(userSendTimes);
                }

            })

            await WordTask.insertMany(insertList);
        } catch(err) {
            console.log(err)
        }

    }


    const scheduleDummyDailySends = async () => {
        const users = await User.find({});
        let insertList = [];
        users.forEach(user => {
            const userHoursObject = TIME_INTERVALS[user.settings.time_interval];
            const userSendTimes = calculateSendTimesForUser(21, 22, 6, user['u_id']);

            insertList = insertList.concat(userSendTimes);
        })

        // await WordTask.insertMany(insertList);
        // await WordTask.deleteMany({})
        const now = new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        console.log(now)
        const wordTasks = await WordTask.find({sent: false, date: {$gt: now}});
        console.log(wordTasks)
    }


    const processTasks = async (tasks, batchSize = 100) => {
        const failedTasks = [];
        for (let i = 0; i < tasks.length; i += batchSize) {
            const batch = tasks.slice(i, i + batchSize);
            const failed = await processBatch(batch);
            failedTasks.push(...failed);
            await sleep(1000)
        }
        return failedTasks;
    }


    const processBatch = async (tasks) => {
        const results = await Promise.allSettled(tasks.map(wordTask => botSendRandomTaskWord(bot, wordTask)));
        const failedMessages = results
            .filter(result => result.status === "fulfilled" && !result.value.success)
            .map(result => result.value);
        const failedDueToRejection = results
            .filter(result => result.status === "rejected")
            .map(result => ({user: result.reason.user, error: result.reason}));

        return [...failedMessages, ...failedDueToRejection];
    }


    const sendScheduledWords = async () => {
        const now = new Date();
        const scheduledWordTasks = await WordTask.find({sent: false, date: {$lt: now}})
        const failedWords = await processTasks(scheduledWordTasks)
        if (failedWords.length) console.log(failedWords)
    }


    cron.schedule('0 3 * * *', async () => {
        await scheduleDailySends()
    })

    cron.schedule('0,10,20,30,40,50 * * * *', async () => {
        await sendScheduledWords()
    })


}