import { Card } from "@/components/ui/card";
import { formatDuration, formatTime } from "@/lib/utils";

interface Task {
	id: string;
	title: string;
	description: string;
	startTime: string;
	endTime: string;
}

interface TaskGroup {
	date: string;
	tasks: Task[];
}

const taskGroups: TaskGroup[] = [
	{
		date: "May 23, 2024",
		tasks: [
			{
				id: "1",
				title: "Bank Mobile App User Research",
				description: "Research and Analysis",
				startTime: "08:17 AM",
				endTime: "09:29 AM",
			},
			{
				id: "2",
				title: "Bank Mobile App Prototype Design",
				description: "UX/UI Design",
				startTime: "09:35 AM",
				endTime: "10:45 PM",
			},
		],
	},
	{
		date: "May 24, 2024",
		tasks: [
			{
				id: "3",
				title: "Bank Mobile App Wireframe Design",
				description: "UX/UI Design",
				startTime: "07:41 AM",
				endTime: "08:21 PM",
			},
		],
	},
];

export function TaskList() {
	return (
		<div className="space-y-6 p-4">
			{taskGroups.map((group) => (
				<div key={group.date} className="space-y-2">
					<div className="sticky top-0 z-10 bg-background py-2">
						<h2 className="text-sm font-medium">{group.date}</h2>
					</div>
					<div className="space-y-1">
						{group.tasks.map((task) => (
							<Card
								key={task.id}
								className="flex items-center justify-between p-4"
							>
								<div className="space-y-1">
									<h3 className="font-medium">
										{task.title}
									</h3>
									<p className="text-sm text-muted-foreground">
										{task.description}
									</p>
								</div>
								<div className="flex items-center space-x-4">
									<div className="text-sm text-muted-foreground">
										{task.startTime} - {task.endTime}
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
