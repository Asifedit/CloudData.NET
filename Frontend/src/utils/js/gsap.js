import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateHomePage = () => {
    gsap.from(".header-content", {
        opacity: 0,
        y: -60,
        duration: 1,
        ease: "power3.out",
    });
    gsap.from(".header-title-content", {
        opacity: 0,
        scale: 0.6,
        duration: 0.8,
        y: -10,
        stagger: 3,
    });
    gsap.from(".feature", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        y: 80,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".feature",
            start: "top 80%",
        },
        stagger: 0.3,
    });

    gsap.from(".section-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: ".section-title",
            start: "top 80%",
        },
    });

    gsap.from(".section-content", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".section-content",
            start: "top 75%",
            marker: true,
        },
    });

    gsap.from(".footer-content", {
        opacity: 0,
        y: 20,
        duration: 1,
        scrollTrigger: {
            trigger: ".footer-content",
            start: "top 90%",
            marker: true,
        },
    });
};

// export const animateDasborePage = () => {
//     gsap.from(".card-pop-up", {
//         opacity: 1,
//         scale: 0.4,
//         duration: 0.5,
//         y: -10,
//         stagger: 0.4,
//     });
// };
