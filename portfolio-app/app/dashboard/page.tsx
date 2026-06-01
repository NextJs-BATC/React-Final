import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();

	if (!session) {
		redirect("/login");
	}

	return (
		<div>
			<h1>Dashboard</h1>

			<p>{session.user?.name}</p>
		</div>
	);
}
