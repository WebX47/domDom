"use strict";

import createElement from "./vdom/createElement.js";
import render from "./vdom/render.js";
import mount from "./vdom/mount.js";

const createVApp = (count) =>
  createElement("div", {
    attrs: {
      id: "vdom",
      dataCount: count, // count
    },
    children: [
      "The current count is: ",
      String(count), // count
      createElement("img", {
        attrs: {
          src: "https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif",
        },
      }),
    ],
  });

let count = 0;
const vApp = createVApp(count);
const $app = render(vApp);
let $rootEl = mount($app, document.getElementById("app"));

console.log($rootEl);

setInterval(() => {
  count++;
  $rootEl = mount(render(createVApp(count)), $rootEl);
}, 1000);
