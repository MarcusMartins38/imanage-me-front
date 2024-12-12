import {
	BarChart2,
	Clock,
	FileText,
	Settings,
	Users2,
	Receipt,
	ClipboardList,
	HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
	const navigation = [
		{ name: "Tasks", icon: ClipboardList, href: "#", current: true },
		{ name: "Settings", icon: Settings, href: "#", current: false },
	];

	return (
		<div
			className={cn(
				"flex h-screen w-64 flex-col border-r bg-background",
				className,
			)}
		>
			<div className="flex h-14 items-center border-b px-4">
				<span className="text-lg font-semibold">IManage-me</span>
			</div>
			<nav className="flex-1 space-y-1 px-2 py-4">
				{navigation.map((item) => (
					<a
						key={item.name}
						href={item.href}
						className={cn(
							"group flex items-center rounded-md px-2 py-2 text-sm font-medium",
							item.current
								? "bg-primary/10 text-primary"
								: "text-muted-foreground hover:bg-muted hover:text-foreground",
						)}
					>
						<item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
						{item.name}
					</a>
				))}
			</nav>
		</div>
	);
}
