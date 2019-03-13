/**
 * Cross browser transitionEnd event
 * https://davidwalsh.name/css-animation-callback
 * @return {String} Browser's supported transitionend type
 */
export default function whichTransitionEvent() {
  const el = document.createElement('fakeelement');
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  for (let t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}
