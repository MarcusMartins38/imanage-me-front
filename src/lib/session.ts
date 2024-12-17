import "server-only";
import { cookies } from "next/headers";
import { SignInDataResponse, User } from "./types";

const secretKey = process.env.SESSION_SECRET;

// export async function encrypt(payload: SessionPayload) {
// 	return new SignJWT(payload)
// 		.setProtectedHeader({ alg: "HS256" })
// 		.setIssuedAt()
// 		.setExpirationTime("7d")
// 		.sign(encodedKey);
// }

// export async function decrypt(session: string | undefined = "") {
// 	try {
// 		const { payload } = await jwtVerify(session, secretKey);
// 		return payload;
// 	} catch (error) {
// 		console.log("Failed to verify session");
// 	}
// }

export async function createSession(email: string, password: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	const response = await fetch("http://localhost:3333/api/user/sign-in", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password: password,
		}),
	});

	if (!response.ok) {
		throw new Error("Invalid credentials.");
	}
	const resJson = (await response.json()) as SignInDataResponse;
	const { accessToken } = resJson.data;
	const cookieStore = await cookies();

	cookieStore.set("session", accessToken, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}

export async function updateSession() {
	const session = (await cookies()).get("session")?.value;
	// const payload = await decrypt(session);

	if (!session) {
		return null;
	}

	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	const cookieStore = await cookies();
	cookieStore.set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expires,
		sameSite: "lax",
		path: "/",
	});
}

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete("session");
}
