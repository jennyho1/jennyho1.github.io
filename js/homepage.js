import anime from 'animejs';
import gsap from 'gsap'

anime({
  targets: ".homepage h1",
	translateY: 250,
  easing: 'spring(1, 80, 10, 0)',
	loop: false
});

//  ----------- section headers -----------
gsap.registerPlugin(ScrollTrigger);

// project
gsap.to('.gear1', {
	scrollTrigger: {
		trigger: '.gear1',
		scrub: 2
	},
	rotation: -400, 
	duration: 3,
});
gsap.to('.gear2', {
	scrollTrigger: {
		trigger: '.gear2',
		scrub: 2
	},
	rotation: 400, 
	duration: 3,
});

// about me
gsap.to('.left-side', {
	scrollTrigger: {
		trigger: '.left-side',
		toggleActions: "restart restart none none"
	},
	width: '30%',
	duration: 1.2,
});

gsap.to('.block-reveal.tv1', {
	scrollTrigger: {
		trigger: '.block-reveal.tv1',
		onToggle: ({isActive}) => {
			const textReveal = document.querySelector('.block-reveal.tv1');
			textReveal.classList.toggle('block-reveal--active');
		}
	},
});
