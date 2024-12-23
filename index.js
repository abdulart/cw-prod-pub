import 'dotenv/config'
import bot from "./bot/bot.js"
import mongoose from "./bot/database/index.js"


async function main() {
    await mongoose.connect(process.env.DATABASE_URL)

    await bot.launch()
}


main().catch(err => console.log(err));


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))