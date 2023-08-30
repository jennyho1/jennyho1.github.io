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



// addEventListener('scroll', (event) => {
// 	if (document.documentElement.scrollTop > 50) {
//     gsap.to(window, {duration: 2, scrollTo: 400});
//   } else {
//     console.log(event)
//   }
// })

// gsap.to(window, {duration: 2, scrollTo: 400});