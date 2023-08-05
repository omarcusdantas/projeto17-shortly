import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { findUser, createUser, checkPassword, newSession } from "../repository/auth.repository.js";

export async function signup(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(422).send("Passwords don't match");
        }

        const foundUser = await findUser(email);
        if (foundUser) {
            return res.sendStatus(409);
        }

        const hash = bcrypt.hashSync(password, 10);
        await createUser(name, email, hash);
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function signin(req, res) {
    const { email, password } = req.body;

    try {
        const userValidated = await checkPassword(email, password);
        if (!userValidated) {
            return res.sendStatus(401);
        }

        const token = uuid();
        await newSession(userValidated.id, token);
        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}