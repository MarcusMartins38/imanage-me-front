import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const { pathname } = req.nextUrl;

	if (
		token &&
		(pathname === "/" || pathname === "/sign-in" || pathname === "/sign-up")
	) {
		return NextResponse.redirect(new URL("/tasks", req.url));
	}

	if (!token && pathname === "/tasks") {
		return NextResponse.redirect(new URL("/sign-in", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/sign-in", "/sign-up", "/tasks"],
};