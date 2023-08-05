import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function findUser(email) {
    const foundUser = await db.query(`SELECT * FROM users WHERE "email"=$1`, [email]);
    return foundUser.rowCount > 0;
}

export async function createUser(name, email, password) {
    await db.query(`INSERT INTO users ("name", "email" ,"password") VALUES ( $1, $2, $3 )`, [name, email, password]);
}

export async function passwordMatch(email, password) {
    const foundUser = await db.query(`SELECT * FROM users WHERE "email"=$1`, [email]);
    return bcrypt.compareSync(password, foundUser.rows[0].password);
}

export async function newSession(email, token) {
    await db.query(`INSERT INTO sessions ("email","token") VALUES ($1,$2)`, [email, token]);
}
