import { START_TEXT_FIRST, START_TEXT_FOLLOW, HELP_REPLY, SUPPORTS_REPLY } from '../constants.js'
import { sendRandomWord, getRandomUsersWord, sendWord } from '../helpers/words.js';
import { getSettingsKeyboard } from '../helpers/settings.js';
import bot from "../bot.js";


export const setupCommands = async (bot) => {
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

    bot.command('help', (ctx) => ctx.reply(HELP_REPLY));
    bot.command('supports', (ctx) => ctx.reply(SUPPORTS_REPLY));

    await bot.telegram.setMyCommands([
        {
            command: 'help',
            description: 'Помощь, описание',
        },
        {
            command: 'settings',
            description: 'Настроить уведомления, сложность и т.д.',
        },
        {
            command: 'supports',
            description: 'Контакты поддержки',
        },
        {
            command: 'get_random_word',
            description: 'Произвольное слово (#HSK из настроек)',
        }
    ]);
};