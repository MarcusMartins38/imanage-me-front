import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthError } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignInPage() {
	return (
		<div className="flex items-center justify-center h-full w-full">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						action={async (formData) => {
							"use server";
							try {
								await signIn("credentials", formData);
							} catch (error) {
								if (error instanceof AuthError) {
									return;
								}
								throw error;
							}
						}}
					>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									placeholder="johndoe@gmail.com"
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									name="password"
									placeholder="********"
									type={"password"}
								/>
							</div>
						</div>
						<CardFooter className="flex justify-between">
							<Button type="submit">Sign In</Button>
							<Link href="/sign-up">Create Account</Link>
						</CardFooter>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
