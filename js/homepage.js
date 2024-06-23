import anime from 'animejs';
import gsap from 'gsap';

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
	rotation: 400, 
	duration: 3,
});
gsap.to('.gear2', {
	scrollTrigger: {
		trigger: '.gear2',
		scrub: 2
	},
	rotation: -400, 
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


document.addEventListener("DOMContentLoaded", function() {

	//  ----------- cursor following cat-----------
	// https://dev.to/anomaly3108/make-svg-follow-cursor-using-css-and-js-2okp

	let eyeball_left = document.querySelector(".eyeball_left"),
	pupil_left = document.querySelector(".pupil_left"),
	eyeArea_left = eyeball_left.getBoundingClientRect(),
	pupil_leftArea = pupil_left.getBoundingClientRect(),
			R_left = eyeArea_left.width/2,
			r_left = pupil_leftArea.width/2,
	centerX_left = eyeArea_left.left + R_left,
	centerY_left = eyeArea_left.top + R_left;

	let eyeball_right = document.querySelector(".eyeball_right"),
	pupil_right = document.querySelector(".pupil_right"),
	eyeArea_right = eyeball_right.getBoundingClientRect(),
	pupil_rightArea = pupil_right.getBoundingClientRect(),
			R_right = eyeArea_right.width/2,
			r_right = pupil_rightArea.width/2,
	centerX_right = eyeArea_right.left + R_right,
	centerY_right = eyeArea_right.top + R_right;

	document.addEventListener("mousemove", (e)=>{
	let x_left = e.clientX - centerX_left,
	y_left = e.clientY - centerY_left,
	theta_left = Math.atan2(y_left,x_left),
	angle_left = theta_left*180/Math.PI + 360;

	let x_right = e.clientX - centerX_right,
	y_right = e.clientY - centerY_right,
	theta_right = Math.atan2(y_right,x_right),
	angle_right = theta_right*180/Math.PI + 360;


	pupil_left.style.transform = `translateX(${R_left - r_left +"px"}) rotate(${angle_left + "deg"})`;
	pupil_left.style.transformOrigin = `${r_left +"px"} center`;

	pupil_right.style.transform = `translateX(${R_right - r_right +"px"}) rotate(${angle_right + "deg"})`;
	pupil_right.style.transformOrigin = `${r_right +"px"} center`;

	});
  
});
