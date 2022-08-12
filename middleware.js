import {NextResponse} from "next/server";
import {verify} from "./services/jwt_sign_verify";

const {SECRET} = process.env;

export default async function middleware(req) {
    const jwt = req.cookies.get("VielfaltCMS");
    const url = req.nextUrl.clone();

    if (url.pathname.startsWith("/dashboard")) {
        if (jwt === undefined) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }

        try {
            await verify(jwt, SECRET);
            return NextResponse.next();
        } catch (error) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}
