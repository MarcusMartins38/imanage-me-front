"use server";
import { FormState, SigninFormSchema } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function signin(state: FormState, formData: FormData) {
	const validatedFields = SigninFormSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { email, password } = validatedFields.data;

	await createSession(email, password);
	redirect("/tasks");
}

export async function logout() {
	deleteSession();
	redirect("/login");
}
