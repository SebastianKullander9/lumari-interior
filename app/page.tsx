"use client";

import About from "./components/About";
import HeroPage from "./components/HeroPage";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Services from "./components/Services";
import SelectedWorks from "./components/SelectedWorks";
import Footer from "./components/Footer";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function Home() {
	useGSAP(() => {
		ScrollSmoother.create({
			smooth: 1,
			smoothTouch: 0.1,
			effects: true,
			normalizeScroll: true,
			ignoreMobileResize: true,
		});
	});

	return (
		<section>
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<HeroPage />
					<About />
					<Services />
					<SelectedWorks />
					<Footer />
				</div>
			</div>
		</section>
	);
}