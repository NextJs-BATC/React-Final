import Link from "next/link";
import { projects } from "@/app/lib/projects";

export default function ProjectsCarousel() {
	return (
		<section className="mt-10">
			<h2 className="text-2xl font-bold mb-4">Projects</h2>

			<div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
				{projects.map((project) => (
					<Link
						key={project.title}
						href={project.href}
						className="min-w-[250px] flex-shrink-0 rounded-lg border p-4 shadow-sm hover:shadow-md transition"
					>
						<h3 className="text-lg font-semibold">{project.title}</h3>
						<p className="text-sm text-gray-500 mt-2">{project.description}</p>
					</Link>
				))}
			</div>
		</section>
	);
}
