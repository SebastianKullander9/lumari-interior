import localFont from "next/font/local";

export const PPPangaia = localFont({
    src: [
        { path: "../../public/fonts/heading/PPPangaia-Ultralight.otf", weight: "100", style: "normal" },
        { path: "../../public/fonts/heading/PPPangaia-UltralightItalic.otf", weight: "100", style: "italic" },
        { path: "../../public/fonts/heading/PPPangaia-Medium.otf", weight: "400", style: "normal" },
        { path: "../../public/fonts/heading/PPPangaia-MediumItalic.otf", weight: "400", style: "italic" },
        { path: "../../public/fonts/heading/PPPangaia-Bold.otf", weight: "800", style: "normal" },
        { path: "../../public/fonts/heading/PPPangaia-BoldItalic.otf", weight: "800", style: "italic" },
    ],
    variable: "--font-pppangaia",
});

export const PPNeueMontreal = localFont({
    src: [
        { path: "../../public/fonts/text/PPNeueMontreal-Thin.otf", weight: "100", style: "normal" },
        { path: "../../public/fonts/text/PPNeueMontreal-Italic.otf", weight: "100", style: "italic" },
        { path: "../../public/fonts/text/PPNeueMontreal-Book.otf", weight: "400", style: "normal" },
        { path: "../../public/fonts/text/PPNeueMontreal-Medium.otf", weight: "500", style: "normal" },
        { path: "../../public/fonts/text/PPNeueMontreal-SemiBoldItalic.otf", weight: "600", style: "italic" },
        { path: "../../public/fonts/text/PPNeueMontreal-Bold.otf", weight: "700", style: "normal" },
        
    ],
    variable: "--font-ppneuemontreal",
});