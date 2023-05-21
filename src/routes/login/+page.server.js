import { fail, redirect } from '@sveltejs/kit';
import { validateLogin, validateCaribou } from '$lib/utils/validation';
import { loginUser, createUser } from '$lib/server/login';

export function load(event) {
    if (event.locals.user) {
        throw redirect(302, '/');
    }
}

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const loginValid = validateLogin(email, password);
        if (!loginValid.valid) {
            return fail(400, { error: loginValid.error });
        }

        const { error, token } = await loginUser(email, password);
        if (error) {
            return fail(401, { error });
        }
        
        cookies.set('AuthorizationToken', `Bearer ${token}`, {
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'strict',
            maxAge: 86400 // 1 day
        })

        throw redirect(302, '/');
    },
    register: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const loginValid = validateLogin(email, password);
        if (!loginValid.valid) {
            return fail(400, { error: loginValid.error });
        }

        const caribouValid = validateCaribou(email, password);
        if (!caribouValid.valid) {
            return fail(401, { error: caribouValid.error });
        }

        const { error } = await createUser(email, password);
        if (error) {
            return fail(500, { error });
        }

        return { success: true };
    },
    logout: async ({ cookies }) => {
        cookies.delete('AuthorizationToken');
        throw redirect(302, '/login');
    }
};