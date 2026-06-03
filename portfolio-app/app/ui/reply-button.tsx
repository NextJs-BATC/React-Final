"use client";

import { useState } from "react";
import { sendReply } from "@/app/lib/contact-actions";

export default function ReplyButton({
	recipientId,
	subject,
	threadId,
}: {
	recipientId: string;
	subject: string;
	threadId: string;
}) {
	const [open, setOpen] = useState(false);

	if (!open) {
		return (
			<button
				onClick={() => setOpen(true)}
				className="text-blue-500 text-sm hover:underline"
			>
				Reply
			</button>
		);
	}

	return (
		<form
			action={async (formData) => {
				await sendReply(recipientId, subject, threadId, formData);
				setOpen(false);
			}}
			className="mt-2 space-y-2"
		>
			<input type="hidden" name="recipient_id" value={recipientId} />
			<input type="hidden" name="subject" value={subject} />
			<input type="hidden" name="thread_id" value={threadId} />

			<textarea
				name="content"
				className="w-full border p-2 text-sm rounded"
				placeholder="Write reply..."
			/>

			<div className="flex gap-2">
				<button className="text-green-600 text-sm">Send</button>

				<button
					type="button"
					onClick={() => setOpen(false)}
					className="text-gray-500 text-sm"
				>
					Cancel
				</button>
			</div>
		</form>
	);
}
