export type User = {
	id: string;
	name: string;
	email: string;
	role: "admin" | "user";
	createdAt: Date;
	updatedAt: Date;
};

export type SignInDataResponse = {
	message: string;
	data: {
		user: User;
		accessToken: string;
	};
};

export type Session = User & {
	accessToken: string;
};
