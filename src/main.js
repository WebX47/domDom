"use strict";

class TheGodOfComedy {
  constructor(universe, deityName = "domDom") {
    this.universe = universe;
    this.deityName = deityName;
  }

  // Create a hilarious being - create element
  createBeingOfLaughter(type, superpowers, ...offsprings) {
    return { type, superpowers, offsprings };
  }

  // Share a comedic being with the world - render element
  spreadLaughter(being) {
    const entity = document.createElement(being.type);

    for (const power in being.superpowers) {
      entity.setAttribute(power, being.superpowers[power]);
    }

    for (const offspring of being.offsprings) {
      if (offspring.type) {
        entity.appendChild(this.spreadLaughter(offspring));
      } else {
        entity.appendChild(document.createTextNode(offspring));
      }
    }

    this.universe.appendChild(entity);
    return entity;
  }
}

const universe = document.getElementById("vdom");
const godOfComedy = new TheGodOfComedy(universe);

const funnyBeing = godOfComedy.createBeingOfLaughter(
  "div",
  { class: "hilarious" },
  godOfComedy.createBeingOfLaughter("p", {}, "Why did the tomato turn red?"),
  godOfComedy.createBeingOfLaughter("p", {}, "Because it saw the salad dressing!"),
  godOfComedy.createBeingOfLaughter("img", { src: "https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif" })
);

godOfComedy.spreadLaughter(funnyBeing);
