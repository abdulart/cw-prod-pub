import User from '../database/models/User.js';

const userAuth = async (ctx, next) => {
    ctx.session ??= { bot_user: null };
    if (ctx.session.bot_user) {
        // console.log('we already have bot_user_state:', ctx.session.bot_user)
        return await next()
    }
    if (!ctx.update) return await next()
    let user_id = null
    if (ctx.update.message) {
        user_id = ctx.update.message.chat.id
    } else if (ctx.update.callback_query) {
        if (!ctx.update.callback_query.from) return await next()
        user_id = ctx.update.callback_query.from.id
    } else {
        return await next()
    }

    let currentUser = await User.findOne({ u_id: user_id });

    if (!currentUser) {
        currentUser = await User.create({
            u_id: ctx.message.chat.id,
            name: ctx.message.chat.first_name || '',
            nickname: ctx.message.chat.username || ''
        });
    }

    ctx.session.bot_user = currentUser;
    // console.log('we have added bot_user_state:', ctx.session.bot_user)
    await next();
};

export { userAuth };