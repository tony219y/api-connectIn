
import { eq, or } from "drizzle-orm";
import { db } from "../configs/database";
import { usersTable } from "../configs/database/schema";
import 'dotenv/config';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { generateToken } from "../helpers/jwtHelper";

export const register = async (username: string, email: string, password: string) => {

    try {
        const existingUser = await db
            .select()
            .from(usersTable)
            .where(or(eq(usersTable.username, username), eq(usersTable.email, email)));

        if (existingUser.length > 0) throw new Error('Username or Email has already exists');
        const hash = await bcrypt.hash(password, 10);
        const response = await db.insert(usersTable)
            .values({
                username: username,
                email: email,
                password: hash
            })
        return response;

    } catch (error: any) {
        throw new Error(error.message);
    }

}

export const login = async (email: string, password: string) => {
    try {
        const existingUser = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

        const hashed = await bcrypt.compare(password, existingUser[0].password);
        if (existingUser.length === 0 || !hashed) throw new Error('Email or Password is incorrect');
        const token = generateToken((existingUser[0].id).toString());
        // console.log(token);
        return token;

    } catch (error: any) {
        throw new Error(error.message);
    }
}


export const me = async (id: any) => {
    try {
        const existingUser = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, id));
        // console.log('existingUser: ',existingUser);
        if (existingUser.length === 0) throw new Error('User not found');

        return {
            id: existingUser[0].id,
            username: existingUser[0].username,
            email: existingUser[0].email
        };

    } catch (error: any) {
        throw new Error(error.message);
    }
}