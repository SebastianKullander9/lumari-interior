import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function About() {
    const aboutRef = useRef<HTMLDivElement>(null);
    const aboutTextRef = useRef<HTMLDivElement>(null);

    const images = [
        { selector: "scale-image0", scale: 0.95, scaleTo: 1 },
        { selector: "scale-image1", scale: 0.791667, scaleTo: 1. },
        { selector: "scale-image2", scale: 0.633334, scaleTo: 1 },
        { selector: "scale-image3", scale: 0.475001, scaleTo: 1 },
        { selector: "scale-image4", scale: 0.316668, scaleTo: 1 },
        { selector: "scale-image5", scale: 0.158335, scaleTo: 1 },
        { selector: "scale-image6", scale: 0.000002, scaleTo: 1 }
    ];

    const textAnimations = [
        { text: "ABOUT", selector: "transform-about0", x: "-100vw" },
        { text: "LUMARI", selector: "transform-about1", x: "100vw" }
    ];

    const aboutHeading = "Timeless Meets Modern";
    const aboutText = "At Lumari Interiors, we bring together the best of tradition and modern design. Drawing inspiration from classical architecture, craftsmanship, and materials, we create spaces that are both elegant and functional. Every project is an exploration of balance—heritage meets innovation, texture meets simplicity, and lasting quality meets adaptability. The result is interiors that feel timeless, distinctive, and thoughtfully designed to inspire for years to come.";

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: aboutRef.current,
			start: "top top",
			end: "max",
			pin: true,
			pinSpacing: false,
        });

        ScrollTrigger.create({
            trigger: aboutTextRef.current,
            start: "top bottom",
            end: "bottom top",
            pinSpacing: false,
            markers: true
        });

        images.forEach((image, index) => {
            gsap.fromTo(`.${image.selector}`, 
                { scale: image.scale },
                {
                    scale: image.scaleTo,
                    scrollTrigger: {
                        trigger: aboutRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                    },
                    stagger: index * 0.0005,
                }
            );
        });

        gsap.fromTo(".scale-background", 
            { scale: 0 },
            {
                scale: 1,
                scrollTrigger: {
                    trigger: aboutRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                }
        });

        textAnimations.forEach(({selector, x}) => {
            gsap.to(`.${selector}`, {
                x,
                scrollTrigger: {
                    trigger: aboutRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            })
        });

        gsap.to(".staggered-word", {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
                trigger: aboutTextRef.current,
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
            }
        });

        gsap.to(".staggered-line", {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
                trigger: aboutTextRef.current,
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
            }
        });

        gsap.to(".move-images", {
            x: 200,
            scrollTrigger: {
                trigger: aboutTextRef.current,
                start: "top bottom",
                end: "bottom bottom",
                scrub: true
            }
        })
    });

    return(
        <>
            <section ref={aboutRef} className="relative w-full h-[200vh] bg-[var(--color-baby-powder)] justify-start px-3 gap-4">
                <div className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center">
                    <div className="flex gap-6 font-semibold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                        {textAnimations.map((text) => {
                            return <h1 key={text.selector} className={`${text.selector}`}>{text.text}</h1>
                        })}
                    </div>
                </div>


                <div className="w-screen h-screen absolute top-0 left-0">
                    <div className="scale-background w-screen h-screen bg-[var(--color-baby-powder-hover)] overflow-hidden">
                        <div className="move-images absolute w-full h-full">
                            {images.map((image) => {
                                return <Image key={image.selector} src="/about/arm-with-apple-cropped.png" fill alt="" className={`${image.selector} object-cover sm:object-contain`} />
                            })}
                        </div>

                        <div className="textAnimationsTest absolute p-4 lg:p-8 h-screen w-screen lg:top-1/10">
                            <h1 className="font-semibold mb-8 mt-16" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                                {aboutHeading.split(" ").map((word, i) => (
                                    <span key={i} className="staggered-word inline-block mr-2 opacity-0">{word}</span>
                                ))}
                            </h1>
                            <p className="max-w-6/10 lg:max-w-2/4 text-md lg:text-2xl text-gray-700 leading-6">
                                {aboutText.split(" ").map((sentence, i) => (
                                    <span key={i} className="staggered-line inline-block opacity-0 mr-[5px] lg:mr-[10px]">{sentence}</span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={aboutTextRef} className="relative w-full h-[100vh] bg-red-500/50">
                <div className="w-screen h-screen absolute top-0 left-0">
                </div>
            </section>
        </>
        
    );
}