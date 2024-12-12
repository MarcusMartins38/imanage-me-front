import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { TaskList } from "@/components/tasklist";

export default function Tasks() {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<div className="flex flex-1 flex-col">
				<Header />
				<main className="flex-1 overflow-auto">
					<TaskList />
				</main>
			</div>
		</div>
	);
}
