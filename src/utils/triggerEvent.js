/**
 * Trigger a custom event on an element. IE9+
 * See http://youmightnotneedjquery.com/#trigger_custom
 * @param {Element} element
 * @param {String} name
 * @param data
 */
export default function triggerEvent(element, name, data) {
    const event = new CustomEvent(name, { detail: { data } });

    return element.dispatchEvent(event);
}