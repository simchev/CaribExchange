export function load(event) {
    if (event.locals.user) {
        return { loggedIn: true };
    }
}