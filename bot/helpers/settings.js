import {TIME_INTERVALS} from '../constants.js'


export const getSettingsKeyboard = (user_settings) => {
    const recieving = user_settings['receiving_messages'];
    const words_number = user_settings['word_per_day'];
    const ed_level = user_settings['ed_level'];
    const time_interval = user_settings['time_interval']
    const from_interval = TIME_INTERVALS[time_interval]['from']
    const to_interval = TIME_INTERVALS[time_interval]['to']
    const buttons = [
        [{
            text: `${recieving ? '🔕 Выключить' : '🔔 Включить'}`,
            callback_data: "toggle_words"
        }],
        [{
            text: `Количество слов в день: ${words_number}`,
            callback_data: "words_number"
        }],
        [{
            text: `Уровень сложности: HSK-${ed_level}`,
            callback_data: "ed_level"
        }],
        [{
            text: `Время уведомлений: с ${from_interval}:00 до ${to_interval}:00`,
            callback_data: "notif_interval"
        }],
        [{
            text: `Часовой пояс`,
            callback_data: "timezone"
        }],
        [{
            text: `🚫 Закрыть`,
            callback_data: "close_settings"
        }],
    ]
    return buttons
}

export const getTimeIntervalButtons = (user_settings) => {
    const time_interval = user_settings['time_interval']
    const buttons = [
        [{
            text: `C 9:00 до 21:00${time_interval == 0 ? " ☑️" : ""}`,
            callback_data: "time_interval_0"
        }],
        [{
            text: `C 10:00 до 18:00${time_interval == 1 ? " ☑️" : ""}`,
            callback_data: "time_interval_1"
        }],
        [{
            text: `C 13:00 до 15:00${time_interval == 2 ? " ☑️" : ""}`,
            callback_data: "time_interval_2"
        }],
        [{
            text: `C 18:00 до 20:00${time_interval == 3 ? " ☑️" : ""}`,
            callback_data: "time_interval_3"
        }],
        [{
            text: `C 21:00 до 23:00${time_interval == 4 ? " ☑️" : ""}`,
            callback_data: "time_interval_4"
        }],
        [{
            text: `⬅️ Назад`,
            callback_data: "back"
        }],
    ]
    return buttons
}

export const getWordsNumberButtons = (user_settings) => {
    const word_number = user_settings['word_per_day']
    const buttons = [
        [{
            text: `1${word_number == 1 ? " ☑️" : ""}`,
            callback_data: "words_number_1"
        }],
        [{
            text: `2${word_number == 2 ? " ☑️" : ""}`,
            callback_data: "words_number_2"
        }],
        [{
            text: `3${word_number == 3 ? " ☑️" : ""}`,
            callback_data: "words_number_3"
        }],
        [{
            text: `5${word_number == 5 ? " ☑️" : ""}`,
            callback_data: "words_number_5"
        }],
        [{
            text: `10${word_number == 10 ? " ☑️" : ""}`,
            callback_data: "words_number_10"
        }],
        [{
            text: `⬅️ Назад`,
            callback_data: "back"
        }],
    ]
    return buttons
}

export const getEdLevelButtons = (user_settings) => {
    const ed_level = user_settings['ed_level']
    const buttons = [
        [{
            text: `HSK 1${ed_level == 1 ? " ☑️" : ""}`,
            callback_data: "ed_level_1"
        }],
        [{
            text: `HSK 2${ed_level == 2 ? " ☑️" : ""}`,
            callback_data: "ed_level_2"
        }],
        [{
            text: `HSK 3${ed_level == 3 ? " ☑️" : ""}`,
            callback_data: "ed_level_3"
        }],
        [{
            text: `HSK 4${ed_level == 4 ? " ☑️" : ""}`,
            callback_data: "ed_level_4"
        }],
        [{
            text: `HSK 5${ed_level == 5 ? " ☑️" : ""}`,
            callback_data: "ed_level_5"
        }],
        [{
            text: `HSK 6${ed_level == 6 ? " ☑️" : ""}`,
            callback_data: "ed_level_6"
        }],
        [{
            text: `⬅️ Назад`,
            callback_data: "back"
        }],
    ]
    return buttons
}

export const getTimezoneButtons = () => {
    const buttons = [
        [{
            text: `⬅️ Назад`,
            callback_data: "back"
        }],
    ]
    return buttons
}