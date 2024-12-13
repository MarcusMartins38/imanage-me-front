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
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const router = useRouter();

	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const handleSignInButton = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3333/user/sign-in", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			if (!response.ok) throw new Error("Error at request sign in");

			const data = await response.json();
			document.cookie = `token=${data.token}; path=/; HttpOnly; max-age=3600`;
			router.push("/tasks");
		} catch (err) {
			console.error("Error: ", err);
		}
	};

	return (
		<div className="flex items-center justify-center h-full w-full">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									placeholder="johndoe@gmail.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="password">Password</Label>
								<div className="relative">
									<Input
										id="password"
										placeholder="********"
										type={
											isPasswordVisible
												? "text"
												: "password"
										}
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
									<button
										type="button"
										className="absolute right-3 top-1/2 transform -translate-y-1/2"
										onClick={togglePasswordVisibility}
									>
										{isPasswordVisible ? (
											<EyeOff size={20} />
										) : (
											<Eye size={20} />
										)}
									</button>
								</div>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button onClick={(e) => handleSignInButton(e)}>
						Sign In
					</Button>
					<Link href="/sign-up">Create Account</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
