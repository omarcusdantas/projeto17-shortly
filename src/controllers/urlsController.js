import { nanoid } from 'nanoid';
import { addUrl, getUrlByHash } from "../repository/urls.repository.js";

export async function shortenUrl(req, res) {
    const { url } = req.body;
    const hash = nanoid(6);
    const userId = res.locals.userId;

    try {
        await addUrl(url, hash, userId);
        const newUrl = await getUrlByHash(hash);
        return res.status(201).send({ id: newUrl.id, shortUrl: hash });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}