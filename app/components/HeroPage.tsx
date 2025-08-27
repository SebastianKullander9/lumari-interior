"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const videos = [
	{ video: "/splash-page/jesus.mp4", customStyles: "object-[35%_0%] lg:object-[0%_0%]" },
	{ video: "/splash-page/behind-curtain.mp4", customStyles: "" },
	{ video: "/splash-page/yellow-computer.mp4", customStyles: "xl:object-bottom" },
	{ video: "/splash-page/smelling-flower.mp4", customStyles: "" }
]

export default function HeroPage() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % videos.length);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
			videoRef.current.play();
		}
	}, [index])

	return (
		<section className="relative w-full h-screen overflow-hidden">
			{videos.map((element, i) => (
				<video
					key={i}
					src={element.video}
					autoPlay
					muted
					playsInline
					loop
					preload="auto"
					className={`absolute top-0 left-0 w-full h-full object-cover ${element.customStyles} ${i === index ? "opacity-100" : "opacity-0"}`}
				/>
			))}

            <nav className="absolute flex items-center justify-between top-0 w-full h-14 sm:h-19 font-medium text-[var(--color-baby-powder)] p-4 sm:p-8 z-10" style={{ fontSize: "clamp(0.75rem, 2vw, 1.1rem)" }}>
                <div className="flex gap-8">
                    <Link href="" className="cursor-pointer hover:text-[var(--color-baby-powder-hover)] transition-colors duration-400">
                        <p>About</p>
                    </Link>
                    <Link href="" className="cursor-pointer hover:text-[var(--color-baby-powder-hover)] transition-colors duration-400">
                        <p>Services</p>
                    </Link>
                    <Link href="" className="cursor-pointer hover:text-[var(--color-baby-powder-hover)] transition-colors duration-400">
                        <p>Designed Spaces</p>
                    </Link>
                </div>
                <div>
                    <Link href="">
                        <div className="border-2 py-2 px-4 rounded-full hover:bg-[var(--color-baby-powder)] border-[var(--color-baby-powder)] hover:text-black transition-colors duration-300 whitespace-nowrap">
                            <p>Contact Us</p>
                        </div>
                    </Link>
                </div>
            </nav>

			<div className="absolute flex flex-col w-full h-full justify-center sm:justify-end text-[var(--color-baby-powder)] sm:p-8">
                <div className="">
                    <div className="absolute sm:static bottom-0 w-full flex flex-row justify-between font-medium whitespace-nowrap sm:pr-1 md:pr-2 lg:pr-3 p-4 sm:p-0" style={{ fontSize: "clamp(0.75rem, 2vw, 1.1rem)" }}>
                        <p>Architecture as art</p>
                        <p>Stockholm Sweden</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:h-[8.5vw] sm:items-end text-[17vw] sm:text-[10.5vw] md:text-[10.3vw] lg:text-[10.5vw] leading-[0.9] sm:leading-[0.55] p-4 sm:p-0">
                        <h1>LUMARI</h1>
                        <h1>INTERIORS</h1>
                    </div>
                </div>
			</div>
		</section>
	);
}
