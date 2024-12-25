import { Telegraf, session } from 'telegraf'
import { setupCommands } from "./handlers/commands.js";
import { setupCallbacks } from './handlers/callback.js';
import { userAuth } from './middlewares/user.js';
// import { scheduleSomething } from './helpers/scheduler.js';
import {scheduleAll} from "./helpers/scheduler.js";

const bot = new Telegraf(process.env.BOT_TOKEN)


/** session */
bot.use(session())
/** user via all commands */
bot.use(userAuth)
/**commands + inline callbacks */
await setupCommands(bot)
setupCallbacks(bot)
await scheduleAll(bot)
// scheduleSomething(bot)



export default bot;