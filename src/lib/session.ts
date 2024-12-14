import "server-only";
import { cookies } from "next/headers";
import { Session } from "./types";

export async function getSession(data: Session) {
	const cookieStore = await cookies();
	const existCookie = cookieStore.get(
		process.env.SESSION_COOKIE_NAME as string,
	);

	console.log({ existCookie });

	if (!existCookie) {
		const setCookie = cookieStore.set({
			name: "session",
			value: data.accessToken,
			httpOnly: true,
			path: "/",
		});

		console.log({ setCookie });
		return setCookie;
	}

	return existCookie;
}

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete("session");
}
