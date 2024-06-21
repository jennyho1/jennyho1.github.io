import anime from 'animejs';

// Responsive nav bar

var navOpen = false;

function toggleNav(navOpen){
	const navLinks = document.querySelector(".nav-links");
	const links = document.querySelectorAll(".nav-links div");
	navLinks.classList.toggle("open");
	overlay.classList.toggle("open");
	links.forEach(link => {
			link.classList.toggle("link-fade");
	});
	hamburger.classList.toggle("toggle");
	return !navOpen;
}

const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".nav-overlay");
const links = document.querySelectorAll(".nav-links div a");
const logo = document.querySelector(".logo a");

hamburger.addEventListener('click', ()=>{
	navOpen = toggleNav(navOpen);
});
overlay.addEventListener('click', ()=>{
	navOpen = toggleNav(navOpen);
});
links.forEach(link => {
	link.addEventListener('click', ()=>{
		if (navOpen){
			navOpen = toggleNav(navOpen);
		}
	});
});


// animate logo
var logoAnimation = anime({
	targets: '.logo a img',
	rotate: '1turn',
	autoplay: false,
});

logo.addEventListener('click', ()=>{
	if (navOpen){
		navOpen = toggleNav(navOpen);
	}
	logoAnimation.play();
});



// Hide nav when user scrolls down.
// Show nav when user scrolls up or when cursor is at the top.

let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const navbarHeight = 60;

window.addEventListener('scroll', () => {
	let scrollTop = document.documentElement.scrollTop;

	if (window.scrollY <= 0 || navOpen == true || scrollTop <= lastScrollTop) {
		// show nav bar
		navbar.style.top = '0';
	} else {
		// scrolling down so hide nav bar
		navbar.style.top = `-${navbarHeight}px`;
	} 
	lastScrollTop = scrollTop;
});

window.addEventListener('mousemove', (e) => {
	if (e.clientY < navbarHeight) {
		navbar.style.top = '0';
	}
});



// Dark/Light switch. credits: https://codepen.io/kLeosrisook/pen/VweNjrV

const eyeOpenL =
  "M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30Z";
const eyeOpenR =
  "M208 31C208 47.5685 194.569 61 178 61C161.431 61 148 47.5685 148 31C148 14.4315 161.431 1 178 1C194.569 1 208 14.4315 208 31Z";
const eyeClosedL =
  "M60 0.000190258C60 16.5687 46.5685 30.0002 30 30.0002C13.4315 30.0002 0 16.5687 0 0.000190258C0 0.000190258 13.4315 5.5 30 5.5C46.5685 5.5 60 0.000190258 60 0.000190258Z";
const eyeClosedR =
  "M208 0.999969C208 17.5685 194.569 31 178 31C161.431 31 148 17.5685 148 0.999969C148 0.999969 161.431 9.00001 178 9.00001C194.569 9.00001 208 0.999969 208 0.999969Z";
const mouthOpen =
  "M77 60H130V73.5C130 88.1355 118.136 100 103.5 100C88.8645 100 77 88.1355 77 73.5V60Z";
const mouthClosed =
  "M77 30H130V30.3375C130 30.7034 118.136 31 103.5 31C88.8645 31 77 30.7034 77 30.3375V30Z";

const face = document.querySelector(".innerSwitch");
const switchBG = document.querySelector(".switch-background");
const body = document.querySelector("body");
let switched = false;

face.addEventListener("click", () => {
  var timeline = anime.timeline({
    easing: "easeOutExpo",
    duration: 1000
  });
  timeline.add(
    {
      targets: [face],
      translateX: switched ? -1 : 35,
      rotate: switched ? -360 : 360,
      backgroundColor: switched ? "rgb(110,240,225)" : "rgb(249, 249, 91)"
    },
    50
  ).add(
		{
			targets: [switchBG, body],
			backgroundColor: switched ? "rgb(23, 29, 50)" : "rgb(193, 204, 244)",
			color: switched ? "rgb(255,255,255)" : "rgb(0,0,0)",
		},
		50
	).add(
		{
			targets: ".eye-left",
			d: [{value: switched ? eyeClosedL : eyeOpenL}]
		},
		200
	).add(
		{
			targets: ".eye-right",
			d: [{value: switched ? eyeClosedR : eyeOpenR}]
		},
		200
	).add(
		{
			targets: ".mouth",
			d: [{value: switched ? mouthClosed : mouthOpen}]
		},
		200
	);

  if (switched == true) {
		body.classList.remove("light");
		body.classList.add("dark");
		switched = false;
  } else {
		body.classList.remove("dark");
		body.classList.add("light");
		switched = true;
  }
});
