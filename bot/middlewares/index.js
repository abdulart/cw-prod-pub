import { userAuth } from './user.js';


export const setupMiddlewares = (bot) => {
    bot.use(userAuth);
};