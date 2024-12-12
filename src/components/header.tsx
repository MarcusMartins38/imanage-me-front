import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

export function Header() {
	return (
		<div className="flex h-14 items-center justify-between border-b px-4">
			<div className="flex flex-1 items-center space-x-4">
				<div className="relative w-96">
					<Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						className="pl-8"
						placeholder="Search for anything here"
					/>
				</div>
			</div>
			<Button>
				<Plus className="mr-2 h-4 w-4" />
				Create New
			</Button>
		</div>
	);
}
