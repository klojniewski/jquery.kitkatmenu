# jquery.kitkatmenu

A jQuery plugin for visualization of elements in the viewport when the user scrolls.
=================

## Dependencies:

https://github.com/thesmart/jquery-scrollspy

## Installation

1. Include jQuery ScrollSpy plugin.
2. Add #id attributes and data-title attribute for each scrollable section:
```html
<div id="product-main" data-title="About Us" class="item-product scrollable">
```
3. Initalize the plugin:
```js
$('body').kitkatMenu({
    sections: '.scrollable'
});
```