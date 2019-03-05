/* Focus Overlay - v0.9.5
* https://github.com/MauriceMahan/FocusOverlay
* Copyright (c) 2019 Maurice Mahan. Licensed MIT */
function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function e(){return(e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])}return t}).apply(this,arguments)}Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(t,e){if(null==this)throw new TypeError('"this" is null or not defined');var i=Object(this),o=i.length>>>0;if(0===o)return!1;for(var n,s,a=0|e,r=Math.max(a>=0?a:o-Math.abs(a),0);r<o;){if((n=i[r])===(s=t)||"number"==typeof n&&"number"==typeof s&&isNaN(n)&&isNaN(s))return!0;r++}return!1}});export default(function(){function i(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),this.active=!1,this.scopedEl,this.focusBox,this.previousTarget,this.nextTarget,this.timeout=0,this.inScope=!1,this.transitionEvent=function(){var t=document.createElement("fakeelement"),e={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(var i in e)if(void 0!==t.style[i])return e[i]}(),this.options=function(){for(var t,e,i,o=arguments[0]||{},n=1,s=arguments.length;n<s;n++)if(null!==(t=arguments[n]))for(e in t)o!==(i=t[e])&&void 0!==i&&(o[e]=i);return o}({class:"focus-overlay",activeClass:"focus-overlay-active",animatingClass:"focus-overlay-animating",targetClass:"focus-overlay-target",zIndex:9001,duration:500,inactiveAfterDuration:!1,triggerKeys:[9,36,37,38,39,40,13,32,16,17,18,27],inactiveOnNonTriggerKey:!0,inactiveOnClick:!0,alwaysActive:!1,watchTransitionEnd:!0,onInit:function(){},onBeforeMove:function(){},onAfterMove:function(){},onDestroy:function(){}},e||{}),t instanceof Element?this.scopedEl=t:"string"==typeof t||t instanceof String?this.scopedEl=document.querySelector(t):this.scopedEl=document.querySelector("body"),this.onKeyDownHandler=this.onKeyDownHandler.bind(this),this.onFocusHandler=this.onFocusHandler.bind(this),this.moveFocusBox=this.moveFocusBox.bind(this),this.stop=this.stop.bind(this),this.init()}var o,n,s;return o=i,(n=[{key:"init",value:function(){this.options.alwaysActive?(this.active=!0,window.addEventListener("focusin",this.onFocusHandler,!0)):(window.addEventListener("keydown",this.onKeyDownHandler,!1),this.options.inactiveOnClick&&window.addEventListener("mousedown",this.stop,!1)),this._createFocusBox(),this.options.onInit(this)}},{key:"onKeyDownHandler",value:function(t){var e=this,i=t.which;this.options.triggerKeys.includes(i)?(!1===this.active&&(this.active=!0,window.addEventListener("focusin",this.onFocusHandler,!0)),setTimeout(function(){var t=document.activeElement;t instanceof HTMLIFrameElement&&e.scopedEl.contains(t)&&!0===e.active&&e.moveFocusBox(t)},5)):this.options.inactiveOnNonTriggerKey&&this.stop()}},{key:"_createFocusBox",value:function(){this.focusBox=document.createElement("div"),this.focusBox.setAttribute("aria-hidden","true"),this.focusBox.classList.add(this.options.class),e(this.focusBox.style,{position:"absolute",zIndex:this.options.zIndex,pointerEvents:"none"}),this.scopedEl.insertAdjacentElement("beforeend",this.focusBox)}},{key:"_cleanup",value:function(){null!=this.nextTarget&&(this.previousTarget=this.nextTarget,this.previousTarget.classList.remove(this.options.targetClass),this.previousTarget.removeEventListener(this.transitionEvent,this.moveFocusBox))}},{key:"onFocusHandler",value:function(t){var e=t.target;if(this._cleanup(),this.scopedEl.contains(e)){var i=this.nextTarget;if(this.inScope=!0,null!==e.getAttribute("data-focus")){var o=e.getAttribute("data-focus");this.nextTarget=document.querySelector("[data-focus='".concat(o,"']"))}else if(null!==e.getAttribute("data-focus-label")){var n=document.querySelector("[for='".concat(e.id,"']"));n.length<1&&(function(t){throw new Error('"'+t+'" is read-only')}("associatedEl"),n=e.closest("label")),this.nextTarget=n}else{if(null!==e.getAttribute("data-focus-ignore"))return;this.nextTarget=e}clearTimeout(this.timeout),this.transitionEvent&&this.options.watchTransitionEnd&&this.nextTarget.addEventListener(this.transitionEvent,this.moveFocusBox),this.options.onBeforeMove(i,this.nextTarget,this),this.moveFocusBox(this.nextTarget)}else this.options.alwaysActive?this.inScope=!1:(this.inScope=!1,this.stop())}},{key:"stop",value:function(){this.active=!1,window.removeEventListener("focusin",this.onFocusHandler,!0),this._cleanup(),this.focusBox.classList.remove(this.options.activeClass)}},{key:"moveFocusBox",value:function(t){var i=this;if(t instanceof Event&&(t=document.activeElement),t.classList.add(this.options.targetClass),document.body.contains(t)&&t instanceof Element){var o=function(t){var e=document,i=window,o=e.body,n=void 0!==i.pageXOffset?i.pageXOffset:(e.documentElement||o.parentNode||o).scrollLeft,s=void 0!==i.pageYOffset?i.pageYOffset:(e.documentElement||o.parentNode||o).scrollTop,a=t.getBoundingClientRect();if(t!==o)for(var r=t.parentNode;r!==o&&r;)n+=r.scrollLeft,s+=r.scrollTop,r=r.parentNode;return{bottom:a.bottom+s,height:a.height,left:a.left+n,right:a.right+n,top:a.top+s,width:a.width}}(t),n="".concat(o.width,"px"),s="".concat(o.height,"px"),a="".concat(o.left,"px"),r="".concat(o.top,"px");this.focusBox.classList.add(this.options.animatingClass),this.focusBox.classList.add(this.options.activeClass),e(this.focusBox.style,{width:n,height:s,left:a,top:r}),this.timeout=setTimeout(function(){i.focusBox.classList.remove(i.options.animatingClass),i.options.inactiveAfterDuration&&i.focusBox.classList.remove(i.options.activeClass),i.options.onAfterMove(i.previousTarget,t,i)},this.options.duration)}else this._cleanup()}},{key:"destroy",value:function(){this.focusBox.parentNode.removeChild(this.focusBox),null!=this.previousTarget&&this.previousTarget.classList.remove(this.options.targetClass),null!=this.nextTarget&&this.nextTarget.classList.remove(this.options.targetClass),window.removeEventListener("focusin",this.onFocusHandler,!0),window.removeEventListener("keydown",this.onKeyDownHandler,!1),window.removeEventListener("mousedown",this.stop,!1),this.options.onDestroy(this)}}])&&t(o.prototype,n),s&&t(o,s),i}());
