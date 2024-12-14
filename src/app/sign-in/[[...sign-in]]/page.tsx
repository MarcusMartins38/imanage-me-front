"use client";
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
import Link from "next/link";
import { useActionState } from "react";
import { signin } from "@/app/actions/auth";

export default function SignInPage() {
	const [state, action, pending] = useActionState(signin, undefined);
	return (
		<div className="flex items-center justify-center h-full w-full">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
				</CardHeader>
				<CardContent>
					<form action={action}>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									placeholder="johndoe@gmail.com"
								/>
								{state?.errors?.email && (
									<p>{state.errors.email}</p>
								)}
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									name="password"
									placeholder="********"
									type={"password"}
								/>
								{state?.errors?.password && (
									<div>
										<p>Password must:</p>
										<ul>
											{state.errors.password.map(
												(error) => (
													<li key={error}>
														- {error}
													</li>
												),
											)}
										</ul>
									</div>
								)}
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
