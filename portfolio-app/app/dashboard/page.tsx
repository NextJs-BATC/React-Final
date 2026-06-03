import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { sql } from "@/app/lib/db";
import ReplyButton from "../ui/reply-button";
import Link from "next/link";

export default async function DashboardPage({
	searchParams,
}: {
	searchParams?: Promise<{ reply?: string }>;
}) {
	const params = searchParams ? await searchParams : {};

	const session = await auth();

	if (!session) {
		redirect("/login");
	}

	const messages = await sql`
	SELECT DISTINCT ON (thread_id)
		messages.*,
		users.name AS sender_name
	FROM messages
	LEFT JOIN users ON users.id = messages.sender_id
	WHERE recipient_id = ${session.user.id}
	ORDER BY thread_id, created_at DESC
`;

	return (
		<div className="max-w-xl mx-auto mt-10 space-y-6">
			<h1 className="text-3xl font-bold">Dashboard</h1>

			<div className="rounded-lg border p-4 bg-white dark:bg-zinc-900">
				<p className="text-sm text-gray-500">Logged in as</p>
				<p className="text-lg font-medium">{session.user?.name}</p>
				<p className="text-sm text-gray-500">{session.user?.email}</p>
			</div>
			{params.reply === "sent" && (
				<div className="rounded bg-green-100 p-3 text-green-700">
					Reply sent successfully.
				</div>
			)}
			<div className="rounded-lg border p-4 bg-white dark:bg-zinc-900">
				<h2 className="text-xl font-semibold mb-4">Inbox</h2>

				{messages.length === 0 ? (
					<p className="text-sm text-gray-500">No messages.</p>
				) : (
					<div className="space-y-4">
						{messages.map((message) => (
							<div key={message.id} className="border rounded p-3">
								<p className="font-semibold">{message.subject}</p>

								<p className="text-sm text-gray-500">From: {message.sender_name}</p>

								<p className="mt-2">{message.content}</p>

								<p className="text-xs text-gray-400 mt-2">
									{new Date(message.created_at).toLocaleString()}
								</p>
								<ReplyButton
									recipientId={message.sender_id}
									subject={message.subject}
									threadId={message.thread_id}
								/>
								<br />
								<Link
									href={`/messages/${message.thread_id}`}
									className="text-sm text-blue-500 hover:underline"
								>
									View full thread
								</Link>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
