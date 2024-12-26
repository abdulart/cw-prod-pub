import User from '../database/models/User.js';

const userAuth = async (ctx, next) => {
    try {
        ctx.session ??= { bot_user: null };
        if (ctx.session.bot_user) return await next()
        if (!ctx.from) return await next()
        const u_id = ctx.from.id
        const name = ctx.from.first_name || ''
        const nickname = ctx.from.username || ''

        let currentUser = await User.findOne({ u_id: u_id });

        if (!currentUser) {
            currentUser = await User.create({
                u_id: u_id,
                name: name,
                nickname: nickname,
            });
        }

        ctx.session.bot_user = currentUser;
        return await next();
    } catch(err) {
        console.log(err)
        return await next()
    }

};

export { userAuth };