import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP,ScrollTrigger,ScrollSmoother);

export default function Services() {
    const sectionRef0 = useRef<HTMLDivElement>(null);
    const sectionRef1 = useRef<HTMLDivElement>(null);
    const sectionRef2 = useRef<HTMLDivElement>(null);
    const sectionRef3 = useRef<HTMLDivElement>(null);


    useGSAP(() => {
        ScrollTrigger.create({
            trigger: sectionRef0.current,
            start: "top top",
            end: "max",
            pin: true,
            pinSpacing: false,
        });

        ScrollTrigger.create({
            trigger: sectionRef1.current,
            start: "top-=120px top",
            end: "max",
            pin: true,
            pinSpacing: false,
        });

        ScrollTrigger.create({
            trigger: sectionRef2.current,
            start: "top-=120px top",
            end: "max",
            pin: true,
            pinSpacing: false,
        });

        ScrollTrigger.create({
            trigger: sectionRef3.current,
            start: "top-=120px top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
        });
    })

    return (
        <>
            <section ref={sectionRef0} className="relative w-screen h-[calc(70vh+120px)] bg-[var(--color-baby-powder)] px-4 md:px-8">
                <div className="h-[120px] flex items-center justify-start sm:justify-center">
                    <h1 style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>Services we specialize in</h1>
                </div>
                
                <div className="grid grid-cols-12 py-8 border-t-1">
                    <div className="col-span-12 sm:col-span-3 pb-4 sm:pb-0">
                        <h1 style={{ fontSize: "clamp(1.3rem, 2vw, 2.3rem)" }}>Full-Service Interior Design</h1>
                    </div>
                    <div className="col-span-12 sm:col-span-6 flex justify-center pb-4 sm:pb-0">
                        <div className="relative w-full sm:w-[250px] md:w-[300px] lg:w-[350px] aspect-square sm:aspect-2/3">
                            <Image src="/services/interior-design.jpg" alt="new generation interior" fill  className="rounded-xl object-cover" />
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-3 text-sm md:text-md lg:text-lg text-gray-800">
                        <p>From first sketch to final reveal — we bring your vision to life. Think seamless layouts, striking finishes, and details that transform a house into your home.</p>
                    </div>
                </div>
            </section>

            <section ref={sectionRef1} className="relative w-screen h-[70vh] bg-[var(--color-baby-powder)] px-4 md:px-8">
                <div className="grid grid-cols-12 py-8 border-t-1">
                    <div className="col-span-12 sm:col-span-3 pb-4 sm:pb-0">
                        <h1 style={{ fontSize: "clamp(1.3rem, 2vw, 2.3rem)" }}>Renovation & Remodel Design</h1>
                    </div>
                    <div className="col-span-12 sm:col-span-6 flex justify-center pb-4 sm:pb-0">
                        <div className="relative w-full sm:w-[250px] md:w-[300px] lg:w-[350px] aspect-square sm:aspect-2/3">
                            <Image src="/services/renovation.jpg" alt="new generation interior" fill  className="rounded-xl object-cover" />
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-3 text-sm md:text-md lg:text-lg text-gray-800">
                        <p>We rethink spaces, rework flow, and refresh materials to create rooms that feel brand new but completely yours.</p>
                    </div>
                </div>
            </section>

            <section ref={sectionRef2} className="relative w-screen h-[70vh] bg-[var(--color-baby-powder)] px-4 md:px-8">
                <div className="grid grid-cols-12 py-8 border-t-1">
                    <div className="col-span-12 sm:col-span-3 pb-4 sm:pb-0">
                        <h1 style={{ fontSize: "clamp(1.3rem, 2vw, 2.3rem)" }}>Furniture & Styling</h1>
                    </div>
                    <div className="col-span-12 sm:col-span-6 flex justify-center pb-4 sm:pb-0">
                        <div className="relative w-full sm:w-[250px] md:w-[300px] lg:w-[350px] aspect-square sm:aspect-2/3">
                            <Image src="/services/services-orange.jpg" alt="new generation interior" fill  className="rounded-xl object-cover" />
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-3 text-sm md:text-md lg:text-lg text-gray-800">
                        <p>Bold statement pieces, curated textures, and just the right lighting — we style every corner so the space feels complete, elevated, and alive.</p>
                    </div>
                </div>
            </section>

            <section ref={sectionRef3} className="relative w-screen h-[100vh] bg-[var(--color-baby-powder)] px-4 md:px-8">
                <div className="grid grid-cols-12 py-8 border-t-1">
                    <div className="col-span-12 sm:col-span-3 pb-4 sm:pb-0">
                        <h1 style={{ fontSize: "clamp(1.3rem, 2vw, 2.3rem)" }}>Garden & Outdoor Design</h1>
                    </div>
                    <div className="col-span-12 sm:col-span-6 flex justify-center pb-4 sm:pb-0">
                        <div className="relative w-full sm:w-[250px] md:w-[300px] lg:w-[350px] aspect-square sm:aspect-2/3">
                            <Image src="/services/garden-luxury.jpg" alt="new generation interior" fill  className="rounded-xl object-cover" />
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-3 text-sm md:text-md lg:text-lg text-gray-800">
                        <p>From sculpted landscapes to lush gardens and inviting outdoor living areas, we design exteriors that flow effortlessly with your interiors.</p>
                    </div>
                </div>
            </section>
        </>

    )
}