import gsap from "gsap"
import anime from 'animejs';

// import { MotionPathPlugin } from "gsap/all"


// gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);

// const flightPath = {
// 	path: [
// 		{x:100, y:20},
// 		{x:150, y:100},

// 	],
// 	autoRotate: true,
// }


// gsap.to("#bee", {
//   duration: 2, 
//   ease: "power1.inOut",
//   motionPath: flightPath,
// 	scrollTrigger: {
// 		trigger: "#bee",
// 		toggleActions: "restart none restart pause",
// 		markers: true,
// 		start: "100px bottom",
// 	}
// })
// const path = anime.path('#path');

// anime({
//   targets: '#beee',
//   translateX: path('x'),
//   translateY: path('y'),
//   rotate: path('angle'),
//   loop: true,
//   duration: 26000,
//   easing: 'linear'
// });

function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
      y = direction * 100;
  if(elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
    duration: 1.25, 
    x: 0,
    y: 0, 
    autoAlpha: 1, 
    ease: "expo", 
    overwrite: "auto"
  });
}

function hide(elem) {
  gsap.set(elem, {autoAlpha: 0});
}

document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
    hide(elem); // assure that the element is hidden when scrolled into view
    
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function() { animateFrom(elem) }, 
      onEnterBack: function() { animateFrom(elem, -1) },
      onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
    });
  });
});
