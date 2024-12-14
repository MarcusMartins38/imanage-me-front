import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import { SignInDataResponse } from "./lib/types";

const providers: Provider[] = [
	Credentials({
		credentials: {
			email: {},
			password: {},
		},
		authorize: async (credentials) => {
			console.log("Aaah");
			// PRECISA HASHEAR
			const pwHash = credentials.password;

			const response = await fetch(
				"http://localhost:3333/api/user/sign-in",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: credentials.email,
						password: credentials.password,
					}),
				},
			);

			if (!response.ok) {
				throw new Error("Invalid credentials.");
			}

			const resJson = (await response.json()) as SignInDataResponse;
			const { user, accessToken } = resJson.data;

			return { user, accessToken };
		},
	}),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers,
	pages: {
		signIn: "/signin",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.accessToken;
				token.role = user.user.role;
			}
			return token;
		},

		async redirect({ url, baseUrl }) {
			if (url === "/") {
				return `${baseUrl}/tasks`; // Redireciona para /tasks após login
			}
			return url;
		},
	},
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24, // 1 dia
	},

	secret: process.env.NEXTAUTH_SECRET,
});
