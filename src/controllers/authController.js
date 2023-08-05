import bcrypt from "bcrypt";
import { foundUser, createUser, checkPassword, newSection } from "../repository/auth.repository.js";

export async function sigup(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(422).send("Passwords don't match");
        }

        const isEmailRegistered = await foundUser(email);
        if (isEmailRegistered) {
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
        const passwordMatch = await checkPassword(email, password);
        if (!passwordMatch) {
            return res.sendStatus(401);
        }

        const token = uuid();
        await newSection(email, token);
        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}