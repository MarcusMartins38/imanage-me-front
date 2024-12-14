import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const protectedRoutes = ["/tasks"];
const publicRoutes = ["/sign-in", "/sign-up", "/"];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

	const cookie = (await cookies()).get("session")?.value;

	if (isProtectedRoute && !cookie) {
		return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
	}

	if (isPublicRoute && cookie && !req.nextUrl.pathname.startsWith("/tasks")) {
		return NextResponse.redirect(new URL("/tasks", req.nextUrl));
	}

	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
