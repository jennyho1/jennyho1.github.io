// import gsap from "gsap"
// import { MotionPathPlugin } from "gsap/all"


gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);

const flightPath = {
	path: [
		{x:100, y:20},
		{x:150, y:100},

	],
	autoRotate: true,
}


gsap.to("#bee", {
  duration: 2, 
  ease: "power1.inOut",
  motionPath: flightPath,
	scrollTrigger: {
		trigger: "#bee",
		toggleActions: "restart none restart pause",
		markers: true,
		start: "100px bottom",
	}
})

