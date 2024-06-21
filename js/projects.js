import Draggabilly from "draggabilly"










// initialize the draggabilities
var draggableElems = document.querySelectorAll('.draggable');
var draggies = []
for ( var i=0; i < draggableElems.length; i++ ) {
  var draggableElem = draggableElems[i];
  var draggie = new Draggabilly( draggableElem, {

  });
  draggies.push( draggie );
}

// functions to handle the events of the draggie
function handleDragStart() {
	this.element.classList.remove("animate");
}

function handleDragEnd() {
	this.setPosition(0, 0);
	this.element.classList.add("animate");
}

function handlePointerDown() {
	var dropArea = document.querySelector('.drop-area');
	dropArea.classList.add("show");
}

function handlePointerUp() {
	var dropArea = document.querySelector('.drop-area');
	dropArea.classList.remove("show");
}


// bind event listeners
for (const draggie of draggies) {
	draggie.on( 'dragStart', handleDragStart );
	draggie.on( 'dragEnd', handleDragEnd );
	draggie.on( 'pointerDown', handlePointerDown );
	draggie.on( 'pointerUp', handlePointerUp );
}



	// // based on http://stackoverflow.com/a/2752387 : checks if the droppable element is ready to collect the draggable: the draggable element must intersect the droppable in half of its width or height.
	// Droppable.prototype.isDroppable = function( draggableEl ) {
	// 	var offset1 = getOffset( draggableEl ), width1 = draggableEl.offsetWidth, height1 = draggableEl.offsetHeight,
	// 		offset2 = getOffset( this.el ), width2 = this.el.offsetWidth, height2 = this.el.offsetHeight;

	// 	return !(offset2.left > offset1.left + width1 - width1/2 || 
	// 			offset2.left + width2 < offset1.left + width1/2 || 
	// 			offset2.top > offset1.top + height1 - height1/2 ||
	// 			offset2.top + height2 < offset1.top + height1/2 );
	// }


		/*************************************************************/
	/******************* Some helper functions *******************/
	/*************************************************************/


	// from http://responsejs.com/labs/dimensions/
	function getViewportW() {
		var client = docElem['clientWidth'], inner = window['innerWidth'];
		return client < inner ? inner : client;
	}
	function getViewportH() {
		var client = docElem['clientHeight'], inner = window['innerHeight'];
		return client < inner ? inner : client;
	}
	function scrollX() { return window.pageXOffset || docElem.scrollLeft; }
	function scrollY() { return window.pageYOffset || docElem.scrollTop; }
	// gets the offset of an element relative to the document
	function getOffset( el ) {
		var offset = el.getBoundingClientRect();
		return { top : offset.top + scrollY(), left : offset.left + scrollX() }
	}
	function setTransformStyle( el, tval ) { el.style.transform = tval; }
	function onEndTransition( el, callback ) {
		var onEndCallbackFn = function( ev ) {
			if( support.transitions ) {
				this.removeEventListener( transEndEventName, onEndCallbackFn );
			}
			if( callback && typeof callback === 'function' ) { callback.call(); }
		};

		if( support.transitions ) {
			el.addEventListener( transEndEventName, onEndCallbackFn );
		}
		else {
			onEndCallbackFn();
		}
	}
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	/*************************************************************/
	/************************ Drag & Drop ************************/
	/*************************************************************/


	/***************/
	/** Droppable **/
	/***************/

	function Droppable( droppableEl, options ) {
		this.el = droppableEl;
		this.options = extend( {}, this.options );
		extend( this.options, options );
	}

	Droppable.prototype.options = {
		onDrop : function(instance, draggableEl) { return false; }
	}

	// based on http://stackoverflow.com/a/2752387 : checks if the droppable element is ready to collect the draggable: the draggable element must intersect the droppable in half of its width or height.
	Droppable.prototype.isDroppable = function( draggableEl ) {
		var offset1 = getOffset( draggableEl ), width1 = draggableEl.offsetWidth, height1 = draggableEl.offsetHeight,
			offset2 = getOffset( this.el ), width2 = this.el.offsetWidth, height2 = this.el.offsetHeight;

		return !(offset2.left > offset1.left + width1 - width1/2 || 
				offset2.left + width2 < offset1.left + width1/2 || 
				offset2.top > offset1.top + height1 - height1/2 ||
				offset2.top + height2 < offset1.top + height1/2 );
	}

	// highlight the droppable if it's ready to collect the draggable
	Droppable.prototype.highlight = function( draggableEl ) {
		if( this.isDroppable( draggableEl ) )
			classie.add( this.el, 'highlight' );
		else
			classie.remove( this.el, 'highlight' );
	}

	// accepts a draggable element...
	Droppable.prototype.collect = function( draggableEl ) {
		// remove highlight class from droppable element
		classie.remove( this.el, 'highlight' );
		this.options.onDrop( this, draggableEl );
	}

	window.Droppable = Droppable;




// // initialize droppables
// [].slice.call( document.querySelectorAll( '#drop-area .drop-area__item' )).forEach( function( el ) {
// 	droppableArr.push( new Droppable( el, {
// 		onDrop : function( instance, draggableEl ) {
// 			// show checkmark inside the droppabe element
// 			classie.add( instance.el, 'drop-feedback' );
// 			clearTimeout( instance.checkmarkTimeout );
// 			instance.checkmarkTimeout = setTimeout( function() { 
// 				classie.remove( instance.el, 'drop-feedback' );
// 			}, 800 );
// 			// ...
// 		}
// 	} ) );
// } );


var elem = document.querySelector('.card-area');
var droppable = new Droppable( elem, {
  onDrop : function( instance, draggableEl ) {
		console.log("dropped");
	}
});

console.log(droppable)