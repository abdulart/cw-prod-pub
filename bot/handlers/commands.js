import { START_TEXT_FIRST, START_TEXT_FOLLOW } from '../constants.js'
import { sendRandomWord, getRandomUsersWord, sendWord } from '../helpers/words.js';
import { getSettingsKeyboard } from '../helpers/settings.js';


export const setupCommands = (bot) => {
    bot.command('start', async (ctx) => {
        await ctx.reply(START_TEXT_FIRST)
        await sendRandomWord(ctx)
        await ctx.reply(START_TEXT_FOLLOW)

    })

    bot.command('settings', async (ctx) => {
        const user_settings = ctx.session.bot_user.settings;
        const buttons = getSettingsKeyboard(user_settings)

        await ctx.reply("Настройки:", {
            reply_markup: {
                inline_keyboard: buttons
            }
        });
    })

    bot.command('get_random_word', async (ctx) => {
        const user_id = ctx.session.bot_user.u_id
        const random_word = await getRandomUsersWord(user_id)
        await sendWord(ctx, random_word)
    })
};