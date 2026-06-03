import Link from "next/link";
import { sql } from "@/app/lib/db";

type Project = {
	title: string;
	description: string;
	href: string;
	external: boolean;
};

export default async function ProjectsCarousel() {
	const dbProjects = await sql`
		SELECT title, content, slug
		FROM articles
		ORDER BY created_at DESC
	`;

	const externalProjects: Project[] = [
		{
			title: "Recipe App",
			description: "Full CRUD recipe manager with auth",
			href: "/dashboard/recipes",
			external: false,
		},
	];

	const projects: Project[] = [
		...dbProjects.map((p) => ({
			title: p.title,
			description: (p.content ?? "").slice(0, 120) + "...",
			href: `/articles/${p.slug}`,
			external: false,
		})),
		...externalProjects,
	];

	return (
		<section className="mt-10">
			<h2 className="text-2xl font-bold mb-4">Projects</h2>

			<div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
				{projects.map((project) => {
					const card = (
						<div className="min-w-[250px] flex-shrink-0 rounded-lg border p-4 shadow-sm hover:shadow-md transition">
							<h3 className="text-lg font-semibold">{project.title}</h3>
							<p className="text-sm text-gray-500 mt-2">{project.description}</p>
						</div>
					);

					return project.external ? (
						<a
							key={project.title}
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
						>
							{card}
						</a>
					) : (
						<Link key={project.title} href={project.href}>
							{card}
						</Link>
					);
				})}
			</div>
		</section>
	);
}
