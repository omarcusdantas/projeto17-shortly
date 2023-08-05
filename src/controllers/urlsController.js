import { nanoid } from 'nanoid';
import { addUrl, getUrlByHash, getUrlById } from "../repository/urls.repository.js";

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

export async function getUrl(req, res) {
    const { id } = req.params;
    try {
        const url = await getUrlById(id);
        if (!url) {
            return res.sendStatus(404);
        }
        return res.send({
            id: url.id,
            shortUrl: url.shortUrl,
            url: url.url,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}