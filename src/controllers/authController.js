import { foundUser, createUser } from "../repository/auth.repository.js";

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

        await createUser(name, email, password);
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}