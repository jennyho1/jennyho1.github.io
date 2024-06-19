import anime from 'animejs';
import gsap from 'gsap';


anime({
	targets: "#headline path",
	strokeDashoffset: [anime.setDashoffset, 0],
	easing: "easeInOutSine",
	duration: 2500,
	delay: function (el, i) {
		return i*5
	},
	direction: "alternate",
	loop: false
})


gsap.registerPlugin(ScrollToPlugin);

