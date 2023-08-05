import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function findUser(email) {
    const foundUser = await db.query(`SELECT * FROM users WHERE "email"=$1`, [email]);
    if (foundUser.rowCount > 0) {
        return foundUser.rows[0];
    }
    return false;
}

export async function createUser(name, email, password) {
    await db.query(`
        INSERT INTO users ("name", "email" ,"password") 
        VALUES ( $1, $2, $3 )
        `, [name, email, password]);
}

export async function checkPassword(email, password) {
    const foundUser = await findUser(email);
    if (bcrypt.compareSync(password, foundUser.password)) {
        return foundUser;
    }
    return false;
}

export async function newSession(userId, token) {
    await db.query(`
        INSERT INTO sessions ("userid","token") 
        VALUES ($1,$2)
    `, [userId, token]);
}
