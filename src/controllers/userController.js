import { getUserInfo, getMostVisited } from "../repository/user.repository.js";

export async function getUser(req, res) {
    const userId = res.locals.userId;

    try {
        const user = await getUserInfo(userId);
        return res.send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getRanking(req, res) {
    try {
        const ranking = await getMostVisited();
        return res.send(ranking);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}