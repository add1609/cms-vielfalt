/* eslint-disable import/no-anonymous-default-export */
import {serialize} from "cookie";
import {sign} from "../../../services/jwt_sign_verify";

const {SECRET, PASSWORD} = process.env;

export default async function (req, res) {
    const {username, password} = req.body;
    if (password === PASSWORD) {
        const payload = {
            user: username,
        };
        const token = await sign(
            payload,
            SECRET,
        );
        const serialised = serialize("VielfaltCMS", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
        });
        res.setHeader("Set-Cookie", serialised);
        res.status(200).json({message: "Success!"});
    } else {
        res.status(401).json({message: "Invalid credentials!"});
    }
}
