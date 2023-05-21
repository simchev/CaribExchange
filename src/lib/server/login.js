import { PEPPER, JWT_SECRET } from '$env/static/private';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '$lib/server/db';

async function findUser(email) {
    return await db.user.findUnique({
        where: {
            email
        }
    });
}

export async function createUser(email, password) {
    const user = await findUser(email);
    if (user) {
        return { error: "User already exists" }
    }

    try {
        const user = await db.user.create({
            data: {
                email, 
                password: await bcrypt.hash(password + PEPPER, 14)
            }
        })
        return { user };
    } catch (error) {
        return { error: "Error while creating user" };
    }
}

export async function loginUser(email, password) {
    const user = await findUser(email);
    if (!user) {
        return { error: "Invalid credentials" };
    }

    const valid = await bcrypt.compare(password + PEPPER, user.password);
    if (!valid) {
        return { error: "Invalid credentials" };
    }

    const jwtUser = { id: user.id, email: user.email };
    const token = jwt.sign(jwtUser, JWT_SECRET, {expiresIn: '1d'});

    return { token };
}

export async function verifyUser(token) {
    try {
        const jwtUser = jwt.verify(token, JWT_SECRET);

        const user = await db.user.findUnique({where: {id: jwtUser.id}});
        if (!user) {
            throw new Error("User not found");
        }

        return {
            id: user.id,
            email: user.email
        }
    } catch (error) {
        return { error };
    }
}