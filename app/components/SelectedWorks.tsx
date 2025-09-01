import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, MotionPathPlugin);

const doorDivs = [
    { selector: "doorDiv0", x: "-70vw", style: "absolute right-0 top-1/2 -tranform-1/2 pr-4", text: "Selected"},
    { selector: "doorDiv1", x: "70vw", style: "absolute left-0 top-1/2 -tranform-1/2 pl-4", text: "works"}
];

const imageSources = [
    "/selected-works/apartment-black.jpg",
    "/selected-works/apartment-last.jpg",
    "/selected-works/apartment.jpg",
    "/selected-works/white-apartment.jpg",
];

const svgStyles = [
    {
        line1: {
            x1: "100", y1: "103", x2: "360", y2: "360", strokeWidth: "0.5",
        },
        line2: {
            x1: "100", y1: "97", x2: "360", y2: "-160", strokeWidth: "0.5",
        },
        text: {
            x: "50", y: "100",  fontSize: "7", dy: "2.5", style: "rotate(0.001deg)"
        },
        motionPath: {
            transform: "rotate(90 300 200)",
            class: "translate-x-1/4"
        },
        image: {
            width: "90",
            height: "45"
        }
    },
    {
        line1: {
            x1: "400", y1: "100", x2: "210", y2: "-100", strokeWidth: "1",
        },
        line2: {
            x1: "0", y1: "100", x2: "190", y2: "-100", strokeWidth: "1",
        },
        text: {
            x: "152", y: "-110",  fontSize: "15", dy: "2.5", style: "rotate(0.001deg)"
        },
        motionPath: {
            transform: undefined,
            class: ""
        },
        image: {
            width: "120",
            height: "60"
        }
    }
]

export default function SelectedWorks() {
    const [activeImage, setActiveImage] = useState(imageSources[0]);
    const [svgStyleIndex, setSvgStyleIndex] = useState(0);

    const selectedWorksRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const sectionRef2 = useRef<HTMLDivElement>(null);

    const svgTriggersRef = useRef<ScrollTrigger[]>([]);

    const initializeSvgAnimations = () => {
        svgTriggersRef.current.forEach(trigger => trigger.kill());
        svgTriggersRef.current = [];

        const lines = svgRef.current?.querySelectorAll<SVGLineElement>(".draw");
        const images = gsap.utils.toArray<SVGImageElement>(".svgImage");

        lines?.forEach((line) => {
            const length = line.getTotalLength();
            line.style.strokeDasharray = `${length}`;
            line.style.strokeDashoffset = `${length}`;

            gsap.to(line, {
                strokeDashoffset: 0,
                scrollTrigger: {
                    trigger: sectionRef2.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                },
            });
        });

        const svgOpacityTrigger = ScrollTrigger.create({
            trigger: sectionRef2.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            onUpdate: () => {
                gsap.to(".svgElements", { opacity: 1, duration: 0.1 });
            }
        });
        svgTriggersRef.current.push(svgOpacityTrigger);

        const totalImages = images.length;
        images.forEach((img, i) => {
            const t = i / (totalImages - 1);
            const start = 0.5 - t * 0.5;
            const end = 0.5 + (1 - t) * 0.5;

            gsap.to(img, {
                scrollTrigger: {
                    trigger: sectionRef2.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                },
                motionPath: {
                    path: "#myPath",
                    align: "#myPath",
                    autoRotate: false,
                    alignOrigin: [0.5, 0.5],
                    start,
                    end,
                },
            });
        });

        const progressTrigger = ScrollTrigger.create({
            trigger: sectionRef2.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const index = Math.floor(progress * totalImages);
                const clampedIndex = Math.min(totalImages - 1, index);
                setActiveImage(imageSources[clampedIndex]);
            },
        });
        svgTriggersRef.current.push(progressTrigger);
    };

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: selectedWorksRef.current,
            start: "top top",
            end: "max",
            pin: true,
            pinSpacing: false,
        });

        ScrollTrigger.create({
            trigger: sectionRef2.current,
            start: "top top",
            end: "bottom+=100vh top",
            pin: true,
            pinSpacing: false,
        });

        doorDivs.forEach((door) => {
            gsap.to(`.${door.selector}`, {
                x: door.x,
                scrollTrigger: {
                    trigger: selectedWorksRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });
        });

        initializeSvgAnimations();
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const newIndex = width < 768 ? 1 : 0;
            
            if (newIndex !== svgStyleIndex) {
                setSvgStyleIndex(newIndex);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [svgStyleIndex]);

    useEffect(() => {
        const timer = setTimeout(() => {
            initializeSvgAnimations();
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, [svgStyleIndex]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            svgTriggersRef.current.forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            <section ref={selectedWorksRef} className="relative w-screen h-[200vh]">
                <div className="absolute w-screen h-screen top-0 left-0">
                    <Image src={activeImage} alt="" fill className="object-cover" />
                </div>

                <svg ref={svgRef} viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="svgElements absolute w-screen h-screen opacity-0">
                    <line 
                        className="draw" 
                        x1={svgStyles[svgStyleIndex].line1.x1}
                        y1={svgStyles[svgStyleIndex].line1.y1}
                        x2={svgStyles[svgStyleIndex].line1.x2} 
                        y2={svgStyles[svgStyleIndex].line1.y2}
                        stroke="white" 
                        strokeWidth={svgStyles[svgStyleIndex].line1.strokeWidth} 
                    />
                    <line 
                        className="draw" 
                        x1={svgStyles[svgStyleIndex].line2.x1}
                        y1={svgStyles[svgStyleIndex].line2.y1}
                        x2={svgStyles[svgStyleIndex].line2.x2} 
                        y2={svgStyles[svgStyleIndex].line2.y2}
                        stroke="white" 
                        strokeWidth={svgStyles[svgStyleIndex].line2.strokeWidth} 
                    />
                    <text 
                        x={svgStyles[svgStyleIndex].text?.x} 
                        y={svgStyles[svgStyleIndex].text?.y} 
                        fill="white" 
                        fontSize={svgStyles[svgStyleIndex].text?.fontSize} 
                        dy={svgStyles[svgStyleIndex].text?.dy} 
                        style={{transform: svgStyles[svgStyleIndex].text?.style}}
                    >
                        Selected works
                    </text>
                </svg>

                <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" className={`absolute w-screen h-screen ${svgStyles[svgStyleIndex].motionPath.class}`}>
                    <path 
                        id="myPath" 
                        d="M-50,300 C100,100 500,100 650,300" 
                        stroke="lightgray" 
                        strokeWidth="2" 
                        fill="none" 
                        className="opacity-0"
                        transform={svgStyleIndex === 0 ? svgStyles[svgStyleIndex].motionPath.transform : undefined}
                    />
                    
                    <image 
                        href="/selected-works/apartment-black.jpg" 
                        width={svgStyles[svgStyleIndex].image?.width} 
                        height={svgStyles[svgStyleIndex].image?.height} 
                        className="svgImage" 
                    />
                    <image 
                        href="/selected-works/apartment-last.jpg" 
                        width={svgStyles[svgStyleIndex].image?.width} 
                        height={svgStyles[svgStyleIndex].image?.height} 
                        className="svgImage" 
                    />
                    <image 
                        href="/selected-works/apartment.jpg" 
                        width={svgStyles[svgStyleIndex].image?.width} 
                        height={svgStyles[svgStyleIndex].image?.height} 
                        className="svgImage" 
                    />
                    <image 
                        href="/selected-works/white-apartment.jpg" 
                        width={svgStyles[svgStyleIndex].image?.width} 
                        height={svgStyles[svgStyleIndex].image?.height} 
                        className="svgImage" 
                    />
                </svg>

                <div className="absolute w-screen h-screen top-0 left-0 flex flex-row">
                    {doorDivs.map((door) => (
                        <div key={door.selector} className={`${door.selector} w-1/2 h-full bg-[var(--color-baby-powder)]`}>
                            <div className={door.style}>
                                <h1 className="text-7xl">{door.text}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section ref={sectionRef2} className="relative w-screen h-[100vh]">
            </section>
        </>
    );
}
