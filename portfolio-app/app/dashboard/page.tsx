import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/ui/logout-button";

export default async function DashboardPage() {
	const session = await auth();

	if (!session) {
		redirect("/login");
	}

	return (
		<div className="max-w-xl mx-auto mt-10 space-y-6">
			<h1 className="text-3xl font-bold">Dashboard</h1>

			<div className="rounded-lg border p-4 bg-white dark:bg-zinc-900">
				<p className="text-sm text-gray-500">Logged in as</p>
				<p className="text-lg font-medium">{session.user?.name}</p>
				<p className="text-sm text-gray-500">{session.user?.email}</p>
			</div>
		</div>
	);
}
