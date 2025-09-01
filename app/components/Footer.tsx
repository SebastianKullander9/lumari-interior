import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);


export default function Footer() {
    const section1 = useRef<HTMLDivElement>(null);
    const section2 = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: section1.current,
            start: "top top",
            end: "max",
            pin: true,
            pinSpacing: false,
        });

        gsap.fromTo(".moveSection", 
            {
                x: "100vw",
            },
            {
                x: "0vw",
                scrollTrigger: {
                    trigger: section2.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                    markers: true,
                }
            });
    });

    return (
        <>
            <section ref={section1} className="relative w-screen h-screen z-[9999]">
                <section className="moveSection absolute w-screen h-screen top-0 bg-black">
                    <nav className="absolute h-[75vh] top-0 w-full text-[var(--color-baby-powder)] flex justify-between p-4 sm:p-8 z-[9999]">
                        <div className="font-medium absolute lg:static bottom-40" style={{ fontSize: "clamp(0.75rem, 2vw, 1.1rem)" }}>
                            <p>Stockholm</p>
                            <p>Sweden</p>
                        </div>
                        <div className="flex flex-col text-7xl">
                            <Link className="cursor-pointer hover:text-[var(--color-baby-powder-hover)] transition-colors duration-400" href="">
                                <h1>Home</h1>
                            </Link>
                            <Link className="cursor-pointer hover:text-[var(--color-baby-powder-hover)] transition-colors duration-400" href="">
                                <h1>About us</h1>
                            </Link>
                            <Link className="cursor-pointer hover:text-[var(--color-baby-powder-hover)] transition-colors duration-400" href="">
                                <h1>Services</h1>
                            </Link>
                            <Link className="cursor-pointer hover:text-[var(--color-baby-powder-hover)] transition-colors duration-400" href="">
                                <h1>Designed spaces</h1>
                            </Link>
                        </div>
                        <div className="font-medium absolute lg:static bottom-0 pr-4 sm:pr-8 lg:pr-0" style={{ fontSize: "clamp(0.75rem, 2vw, 1.1rem)" }}>
                            <p className="cursor-pointer hover:text-[var(--color-baby-powder-hover)] transition-colors duration-400">Instagram</p>
                            <p className="cursor-pointer hover:text-[var(--color-baby-powder-hover)] transition-colors duration-400">Facebook</p>
                            <p className="cursor-pointer hover:text-[var(--color-baby-powder-hover)] transition-colors duration-400">Twitter</p>
                        </div>
                    </nav>

                    <div className="absolute flex flex-col w-full h-full justify-end text-[var(--color-baby-powder)] sm:p-8">
                        <div className="">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:h-[8.5vw] sm:items-end text-[17vw] sm:text-[10.5vw] md:text-[10.3vw] lg:text-[10.5vw] leading-[0.9] sm:leading-[0.75] p-4 pb-8 sm:pb-0 sm:p-0">
                                <h1>LUMARI</h1>
                                <h1>INTERIORS</h1>
                            </div>
                            <div className="absolute sm:static bottom-0 w-full flex flex-row justify-between font-medium whitespace-nowrap sm:pr-1 md:pr-2 lg:pr-3 p-4 sm:p-0" style={{ fontSize: "clamp(0.75rem, 2vw, 1.1rem)" }}>
                                <p>© 2025 All rights reserved</p>
                                <p>Created by Sebastian Kullander</p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <section ref={section2} className="relative w-screen h-screen z-40">

            </section>
        </>
        
    )
}