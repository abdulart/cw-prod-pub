import 'dotenv/config'
import bot from "./bot/bot.js"
import mongoose from "./bot/database/index.js"
import Word from "./bot/database/models/Word.js";
import {HSK_1_JSON, HSK_2_JSON, HSK_3_JSON, HSK_4_JSON, HSK_5_JSON, HSK_6_JSON} from "./initial_data/words.js";


async function main() {
    await mongoose.connect(process.env.DATABASE_URL)

    const wordsList = await Word.find()
    if (!wordsList.length) {
        await Word.insertMany(HSK_1_JSON)
        await Word.insertMany(HSK_2_JSON)
        await Word.insertMany(HSK_3_JSON)
        await Word.insertMany(HSK_4_JSON)
        await Word.insertMany(HSK_5_JSON)
        await Word.insertMany(HSK_6_JSON)
    }

    await bot.launch()
}


main().catch(err => console.log(err));


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))