import Image from "next/image";
import { RefObject } from "react";

type ServiceObject = {
    heading: string;
    text: string;
    imageUrl: string;
    height: string;
    alt: string;
}

interface ServiceSectionProps {
    service: ServiceObject;
    index: number,
    sectionRefs: RefObject<(HTMLDivElement | null)[]>;
}

export default function ServiceSection({service, index, sectionRefs}: ServiceSectionProps ) {
    return (
        <section 
            ref={(el) => {
                if (sectionRefs.current) {
                    sectionRefs.current[index] = el as HTMLDivElement;
                }
            }}   
            className={`relative w-screen ${service.height} bg-[var(--color-baby-powder)] px-4 md:px-8`}
        >
            {index === 0 ? 
                <div className="h-[120px] flex items-center justify-start sm:justify-center">
                    <h1 style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>Services we specialize in</h1>
                </div> : ""  
            }
            <div className="grid grid-cols-12 py-8 border-t-1">
                <div className="col-span-12 sm:col-span-3 pb-4 sm:pb-0">
                    <h1 style={{ fontSize: "clamp(1.3rem, 2vw, 2.3rem)" }}>{service.heading}</h1>
                </div>
                <div className="col-span-12 sm:col-span-6 flex justify-center pb-4 sm:pb-0">
                    <div className="relative w-full sm:w-[250px] md:w-[300px] lg:w-[350px] aspect-square sm:aspect-2/3">
                        <Image src={service.imageUrl} alt="new generation interior" fill  className="rounded-xl object-cover" />
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-3 text-sm md:text-md lg:text-lg text-gray-800">
                    <p>{service.text}</p>
                </div>
            </div>
        </section>
    )
}