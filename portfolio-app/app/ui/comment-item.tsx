"use client";

import { useState } from "react";
import { updateComment, deleteComment } from "@/app/lib/comment-actions";

type Comment = {
	id: string;
	content: string;
	user_id: string;
};

export default function CommentItem({
	comment,
	isOwner,
	userName,
	createdAt,
}: {
	comment: Comment;
	isOwner: boolean;
	userName?: string | null;
	createdAt?: string;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [content, setContent] = useState(comment.content);

	const formattedDate = createdAt ? new Date(createdAt).toLocaleString() : "";

	return (
		<div className="border p-4 rounded bg-white dark:bg-zinc-900">
			{/* HEADER (user + time + edit button) */}
			<div className="flex justify-between items-center mb-2">
				<div className="text-xs text-gray-500">
					<span className="font-semibold text-gray-700 dark:text-gray-200">
						{userName ?? "Unknown user"}
					</span>

					<span className="ml-2">{formattedDate}</span>
				</div>

				{isOwner && !isEditing && (
					<button
						onClick={() => setIsEditing(true)}
						className="text-gray-500 hover:text-black"
						title="Edit"
					>
						✏️
					</button>
				)}
			</div>

			{/* CONTENT */}
			{!isEditing ? (
				<p className="text-sm">{comment.content}</p>
			) : (
				<div className="space-y-2">
					<form
						action={async (formData) => {
							await updateComment(comment.id, formData);
							setIsEditing(false);
						}}
					>
						<textarea
							name="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="w-full border p-2 rounded text-sm"
						/>

						<button className="text-blue-500 text-sm mt-2">Save</button>
					</form>

					<div className="flex gap-3">
						<button
							type="button"
							onClick={() => {
								setContent(comment.content);
								setIsEditing(false);
							}}
							className="text-gray-500 text-sm"
						>
							Cancel
						</button>

						<button
							onClick={async () => {
								await deleteComment(comment.id);
							}}
							className="text-red-500 text-sm"
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
