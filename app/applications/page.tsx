import { title } from "@/components/primitives";
import {Checkbox, Image ,Code} from "@nextui-org/react";
import applications from "./sample-applications";

export default function ApplicationsPage() {
	return (
		<div>
			<h1 className={title()}>Applications</h1>
			<div className="flex flex-wrap gap-4 m-5">
				{
					applications.map((application, index) => (
						<div key={index} className="flex flex-row gap-2">
							<Checkbox checked={false} />
							<Image src={application.image} width={32} height={32} />
							<h2 className="text-foreground/90">{application.name}</h2>
						</div>
					))
				}
			</div>
		</div>
	);
}
