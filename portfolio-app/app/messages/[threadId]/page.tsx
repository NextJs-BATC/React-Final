import { sql } from "@/app/lib/db";
import { sendReply } from "@/app/lib/contact-actions";
import { auth } from "@/auth";

export default async function ThreadPage({
	params,
}: {
	params: Promise<{ threadId: string }>;
}) {
	const { threadId } = await params;
	const session = await auth();

	const messages = await sql`
		SELECT
			messages.*,
			users.name AS sender_name
		FROM messages
		LEFT JOIN users ON users.id = messages.sender_id
		WHERE thread_id = ${threadId}
		ORDER BY created_at ASC
	`;

	if (messages.length === 0) {
		return (
			<div className="p-6">
				<h1 className="text-xl font-bold">Thread not found</h1>
			</div>
		);
	}

	return (
		<div className="max-w-2xl mx-auto mt-10 space-y-4">
			<h1 className="text-2xl font-bold mb-6">Conversation</h1>

			{messages.map((msg) => (
				<div key={msg.id} className="border p-4 rounded">
					<p className="text-sm text-gray-500">
						{msg.sender_name} • {new Date(msg.created_at).toLocaleString()}
					</p>

					<p className="mt-2">{msg.content}</p>
				</div>
			))}

			{/* REPLY BOX */}
			{session?.user && (
				<form
					action={sendReply.bind(
						null,
						messages[messages.length - 1].sender_id,
						`Re: ${messages[0]?.subject ?? "Message"}`,
						threadId,
					)}
					className="mt-6 space-y-2 border-t pt-4"
				>
					<textarea
						name="content"
						placeholder="Write a reply..."
						className="w-full border p-2 rounded"
						rows={4}
					/>

					<button className="bg-blue-500 text-white px-4 py-2 rounded">Send Reply</button>
				</form>
			)}
		</div>
	);
}
