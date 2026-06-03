export default function Loading() {
	return (
		<div className="max-w-2xl mx-auto mt-10 space-y-4">
			<div className="h-6 w-40 bg-gray-200 animate-pulse rounded" />

			<div className="space-y-3">
				{[1, 2, 3].map((i) => (
					<div key={i} className="h-16 bg-gray-200 animate-pulse rounded" />
				))}
			</div>
		</div>
	);
}
