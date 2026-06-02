export default function Loading() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
			<div className="flex flex-col items-center gap-3">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
				<p className="text-sm text-gray-500">Loading your app...</p>
			</div>
		</div>
	);
}
