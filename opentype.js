'use strict';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $create = document.createElement.bind(document);
const $createcomment = document.createComment.bind(document);
// binding method
const root = document.querySelector(':root');
const proproot = getComputedStyle(root);
const getprop = proproot.getPropertyValue.bind(proproot);

// binding method
const rootstyle = root.style;
const setprop = rootstyle.setProperty.bind(rootstyle);

const fonturl = getprop('--fonturl').slice(1, -1);
const buffer = fetch(
    `${window.location.pathname.replace('index.html', '')}${fonturl}`
).then((res) => res.arrayBuffer());

let font;
