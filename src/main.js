"use strict";

import createElement from "./vdom/createElement.js";
import render from "./vdom/render.js";
import mount from "./vdom/mount.js";
import diff from "./vdom/diff.js";

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
let vApp = createVApp(count);
const $app = render(vApp);
let $rootEl = mount($app, document.getElementById("app"));

setInterval(() => {
  count++;
  const vNewApp = createVApp(count);
  const patch = diff(vApp, vNewApp);

  // we might replace the whole $rootEl,
  // so we want the patch will return the new $rootEl
  $rootEl = patch($rootEl);

  vApp = vNewApp;
}, 1000);
