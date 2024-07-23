import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";


export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Headstart your&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>development&nbsp;</h1>
				<h1 className={title()}>
				   journey
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
				Simplify Your Code Setup, Amplify Your Coding Power!
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					href={siteConfig.links.packages}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
				Explore Packages
				</Link>
				<Link
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.applications}
				>
				Select Applications
				</Link>
			</div>
		</section>
	);
}
