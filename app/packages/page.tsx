import { title } from "@/components/primitives";
import  packages, {Package}  from "./sample-packages";


import React from "react";
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";

function PackageCard({ kit, index} : {kit: Package, index: number}) {

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              shadow="md"
              src="/images/album-cover.png"
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">{kit.name}</h3>
                <p className="text-small text-foreground/80">{kit.description}</p>
              </div>
              
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <FaArrowUpRightFromSquare className="text-foreground/80" />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <FaDownload />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}


export default function PackagesPage() {
	return (
		<div>
			<h1 className={title()}>Packages Page</h1>
			<div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				{packages.map((item, index) => (
					<PackageCard kit={item} index={index} key={index} />
				))}
			</div>
		</div>
	);
}
