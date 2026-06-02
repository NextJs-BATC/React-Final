import { createInquiry } from "@/app/lib/contact-actions";

export default async function ContactPage({
	searchParams,
}: {
	searchParams?: Promise<{ success?: string }>;
}) {
	const params = searchParams ? await searchParams : {};

	return (
		<main className="max-w-2xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Contact Me</h1>

			{params.success && (
				<div className="mb-4 rounded bg-green-100 p-3 text-green-700">
					Message sent successfully.
				</div>
			)}

			<form action={createInquiry} className="space-y-4">
				<input
					name="name"
					placeholder="Your name"
					required
					className="w-full border p-2 rounded"
				/>

				<input
					name="email"
					type="email"
					placeholder="Your email"
					required
					className="w-full border p-2 rounded"
				/>

				<textarea
					name="message"
					placeholder="Your message"
					required
					rows={6}
					className="w-full border p-2 rounded"
				/>

				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Send Message
				</button>
			</form>
		</main>
	);
}
