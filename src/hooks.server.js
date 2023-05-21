import { verifyUser } from '$lib/server/login';

export const handle = async ({ event, resolve }) => {
    const token = event.cookies.get('AuthorizationToken');

    if (token) {
        const user = verifyUser(token.slice(7));
        if (!user.error) {
            event.locals.user = user;
        }
    }

    return await resolve(event);
}