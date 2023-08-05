import { nanoid } from 'nanoid';
import { addUrl, getUrlByHash, getUrlById, increaseVisitCount, deleteUrlById } from "../repository/urls.repository.js";

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

export async function accessUrl(req, res) {
    const hash = req.params.shortUrl;
    
    try {
        const url = await getUrlByHash(hash);
        if (!url) {
            return res.sendStatus(404);
        }

        await increaseVisitCount(hash);
        return res.redirect(url.url);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    const userId = res.locals.userId;

    try {
        const url = await getUrlById(id);
        if (!url) {
            return res.sendStatus(404);
        }

        if (userId !== url.userid) {
            return res.sendStatus(401);
        }

        await deleteUrlById(id);
        return res.sendStatus(204);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Internal server error');
    }
}