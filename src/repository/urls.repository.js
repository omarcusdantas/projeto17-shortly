import { db } from "../database/database.connection.js";

export async function addUrl(url, hash, userId) {
    await db.query(`
        INSERT INTO urls (userid, "shortUrl", url) 
        VALUES($1, $2, $3)
        `, [userId, hash, url]);
}

export async function getUrlByHash(hash) {
    const url = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [hash]);
    return url.rows[0];
}
