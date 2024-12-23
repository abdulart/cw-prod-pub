import path from 'path'
import { Input } from 'telegraf'
import Word from "../database/models/Word.js"
import User from '../database/models/User.js'


export const sendWord = async (ctx, word) => {
    try {
        const title = `HSK-${word['ed_level']}: ${word['ieroglif']}`
        await ctx.replyWithAudio(Input.fromLocalFile(`${path.dirname(process.argv[1])}/word_sounds/${word['word_id']}.mp3`), {
            parse_mode: 'Markdown',
            caption: `
*${word['ieroglif']}*
            ▫️Пиньинь: ${word['transcription']}
            ▫️Перевод: ${word['translation']}

            🔹Уровень: HSK-${word['ed_level']}
        `,
            title: title
        })
    } catch(err) {
        console.log(err)
    }

}

export const botSendWord = async (bot, user_id, word) => {
    const title = `HSK-${word['ed_level']}: ${word['ieroglif']}`
    try {
        await bot.telegram.sendAudio(user_id, Input.fromLocalFile(`${path.dirname(process.argv[1])}/word_sounds/${word['word_id']}.mp3`), {
            parse_mode: 'Markdown',
            caption: `
    *${word['ieroglif']}*
                ▫️Пиньинь: ${word['transcription']}
                ▫️Перевод: ${word['translation']}
    
                🔹Уровень: HSK-${word['ed_level']}
            `,
            title: title
        })
    } catch (err) {
        console.log(err)
    }

}


export const sendRandomWord = async (ctx) => {
    try {
        const random_word_apt = await Word.aggregate([{ $sample: { size: 1 } }]);
        const random_word = random_word_apt[0]
        await sendWord(ctx, random_word)
    } catch(err) {
        console.log(err)
    }

}


export const botSendRandomWord = async (bot, userId) => {
    try {
        const random_user_word = await getRandomUsersWord(userId)
        await botSendWord(bot, userId, random_user_word)
        return { success: true, userId };
    } catch(err) {
        return { success: false, userId, err };
    }

}


export const botSendRandomTaskWord = async (bot, wordTask) => {
    try {
        const userId = wordTask.u_id;
        const currentUser = await User.findOne({u_id: userId})
        if (currentUser && currentUser.settings.receiving_messages) {
            const random_user_word = await getRandomUsersWord(userId)
            await botSendWord(bot, userId, random_user_word)
        }

        wordTask.sent = true;
        await wordTask.save();
        return { success: true, userId };
    } catch(err) {
        return { success: false, err };
    }

}


export const getRandomUsersWord = async(user_id) => {
    try {
        const user = await User.findOne({u_id: user_id})
        if (!user) {
            throw new Error(`User with id ${user_id} not found!`)
        }
        // console.log(user)

        const randomWord = await Word.aggregate([
            { 
                $match: { 
                    word_id: { $nin: user.seen_words }, // Exclude seen words
                    ed_level: user.settings.ed_level // Match word's ed_level to user's ed_level
                }
            },
            { $sample: { size: 1 } } // Randomly select 1 word
        ]);

        // Step 3: Check if we found a word
        if (randomWord.length === 0) {
            console.log("No more unseen words for this user at the current education level.");
            return null; // No unseen words left
        }

        // Step 4: Add the word to user's seen_words
        const selectedWord = randomWord[0];
        user.seen_words.push(selectedWord.word_id);
        await user.save(); // Save the updated user document

        // console.log("Selected Word:", selectedWord);
        return selectedWord;

    } catch (err) {
        console.log(err)
    }
    
}