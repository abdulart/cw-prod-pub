import { getSettingsKeyboard, getTimeIntervalButtons, getWordsNumberButtons, getEdLevelButtons, getTimezoneButtons } from "../helpers/settings.js";
import User from "../database/models/User.js";


export const setupCallbacks = (bot) => {
    /**
     * Выключить - включить уведы
     */
    bot.action("toggle_words", async ctx => {
        const user_id = ctx.session.bot_user.u_id
        let user_settings = ctx.session.bot_user.settings
        // console.log(getSettingsKeyboard(user_settings))
        user_settings['receiving_messages'] = !user_settings['receiving_messages']
        await User.updateOne({u_id: user_id}, 
            { $set: { "settings.receiving_messages": user_settings['receiving_messages'] } }
        )
        const buttons = getSettingsKeyboard(user_settings)
        // console.log(getSettingsKeyboard(user_settings))
        try {
            await ctx.editMessageText('Настройки: ', {
                reply_markup: {
                    inline_keyboard: buttons
                }
            })
        } catch (err) {
            console.log(err)
        }

    });

    /**
     * Закрыть настройки
     */
    bot.action("close_settings", async ctx => {
        await ctx.deleteMessage()
    })

    /**
     * Назад 
     */
    bot.action("back", async ctx => {
        const buttons = getSettingsKeyboard(ctx.session.bot_user.settings)
        try {
            await ctx.editMessageText('Настройки: ', {
                reply_markup: {
                    inline_keyboard: buttons
                }
            })
        } catch (err) {
            console.log(err)
        }
    })

    /**
     * Время уведомлений
     */
    bot.action("notif_interval", async ctx => {
        const buttons = getTimeIntervalButtons(ctx.session.bot_user.settings)
        try {
            await ctx.editMessageText('Время уведомлений: ', {
                reply_markup: {
                    inline_keyboard: buttons
                }
            })
        } catch (err) {
            console.log(err)
        }
    })

    bot.action(/time_interval_(.*)/, async ctx => {
        const interval_index = ctx.match[1]
        const user_settings = ctx.session.bot_user.settings
        user_settings['time_interval'] = interval_index
        const user_id = ctx.session.bot_user.u_id
        await User.updateOne({u_id: user_id}, 
            { $set: { "settings.time_interval": user_settings['time_interval'] } }
        )
        const buttons = getTimeIntervalButtons(user_settings)
        try {
            await ctx.editMessageText('Время уведомлений: ', {
                reply_markup: {
                    inline_keyboard: buttons
                }
            })
        } catch (err) {
            console.log(err)
        }
    })

    /**
     * Кол-во слов
     */
    bot.action("words_number", async ctx => {
        const buttons = getWordsNumberButtons(ctx.session.bot_user.settings)
        try {
            await ctx.editMessageText('Количество слов в день: ', {
                reply_markup: {
                    inline_keyboard: buttons
                }
            })
        } catch (err) {
            console.log(err)
        }
    })

    bot.action(/words_number_(.*)/, async ctx => {
        const words_number = ctx.match[1]
        const user_settings = ctx.session.bot_user.settings
        user_settings['word_per_day'] = words_number
        const user_id = ctx.session.bot_user.u_id
        await User.updateOne({u_id: user_id}, 
            { $set: { "settings.word_per_day": user_settings['word_per_day'] } }
        )
        const buttons = getWordsNumberButtons(user_settings)
        try {
            await ctx.editMessageText('Количество слов в день: ', {
                reply_markup: {
                    inline_keyboard: buttons
                }
            })
        } catch (err) {
            console.log(err)
        }
    })


    /**
     * Ур. сложности
     */
    bot.action("ed_level", async ctx => {
        const buttons = getEdLevelButtons(ctx.session.bot_user.settings)
        try {
            await ctx.editMessageText('Уровень сложности: ', {
                reply_markup: {
                    inline_keyboard: buttons
                }
            })
        } catch (err) {
            console.log(err)
        }
    })

    bot.action(/ed_level_(.*)/, async ctx => {
        const ed_level = ctx.match[1]
        const user_settings = ctx.session.bot_user.settings
        user_settings['ed_level'] = ed_level
        const user_id = ctx.session.bot_user.u_id
        await User.updateOne({u_id: user_id}, 
            { $set: { "settings.ed_level": user_settings['ed_level'] } }
        )
        const buttons = getEdLevelButtons(user_settings)
        try {
            await ctx.editMessageText('Уровень сложности: ', {
                reply_markup: {
                    inline_keyboard: buttons
                }
            })
        } catch (err) {
            console.log(err)
        }
    })

    /**
     * Таймзона
     */
    bot.action("timezone", async ctx => {
        const buttons = getTimezoneButtons()
        try {
            await ctx.editMessageText('Часовой пояc, по умолчанию, Москва. Возможность сменить добавим в ближайшем обновлении!', {
                reply_markup: {
                    inline_keyboard: buttons
                }
            })
        } catch (err) {
            console.log(err)
        }
    })
};