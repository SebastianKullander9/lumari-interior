import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import ServiceSection from "./ServiceSection";

gsap.registerPlugin(useGSAP,ScrollTrigger,ScrollSmoother);

const cardContent = [
    {
        heading: "Services we specialize in", 
        text: "From first sketch to final reveal — we bring your vision to life. Think seamless layouts, striking finishes, and details that transform a house into your home.", 
        imageUrl: "/services/interior-design.jpg",
        height: "h-[calc(70vh+120px)]",
        alt: "Empty space in an apartment"
    },
    {
        heading: "Renovation & Remodel Design", 
        text: "We rethink spaces, rework flow, and refresh materials to create rooms that feel brand new but completely yours.", 
        imageUrl: "/services/renovation.jpg",
        height: "h-[70vh]",
        alt: "A wall with a crack"
    },
    {
        heading: "Furniture & Styling", 
        text: "Bold statement pieces, curated textures, and just the right lighting — we style every corner so the space feels complete, elevated, and alive.", 
        imageUrl: "/services/services-orange.jpg",
        height: "h-[70vh]",
        alt: "A living space that is nicely decorated"
    },
    {
        heading: "Garden & Outdoor Design", 
        text: "From sculpted landscapes to lush gardens and inviting outdoor living areas, we design exteriors that flow effortlessly with your interiors.", 
        imageUrl: "/services/garden-luxury.jpg",
        height: "h-[100vh]",
        alt: "A big luxurious garden"
    }
]

export default function Services() {
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    
    useGSAP(() => {
        sectionRefs.current.forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: i === 0 ? "top top" : "top-=120px top",
                end: i === sectionRefs.current.length - 1 ? "bottom bottom" : "max",
                pin: true,
                pinSpacing: false,
            });
        });
    });

    return (
        <>
            {cardContent.map((service, index) => (
                <ServiceSection key={index} service={service} index={index} sectionRefs={sectionRefs} />
            ))}
        </>

    )
}