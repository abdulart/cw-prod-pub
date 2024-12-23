import 'dotenv/config'
import mongoose from "mongoose";
import Word from "../bot/database/models/Word.js";
import {HSK_1_JSON, HSK_2_JSON, HSK_3_JSON, HSK_4_JSON, HSK_5_JSON, HSK_6_JSON} from "../initial_data/words.js";


async function main() {
    await mongoose.connect(process.env.DATABASE_URL)
    await Word.insertMany(HSK_1_JSON)
    await Word.insertMany(HSK_2_JSON)
    await Word.insertMany(HSK_3_JSON)
    await Word.insertMany(HSK_4_JSON)
    await Word.insertMany(HSK_5_JSON)
    await Word.insertMany(HSK_6_JSON)
}


main()
    .then(() => {console.log('success')})
    .catch(err => console.log(err))
    .finally(() => {process.exit(1)})