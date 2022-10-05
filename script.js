'use strict'

const wrapper = document.querySelector(".wrapper");
const input = document.querySelector(".livesearch");



async function getCoffee(member) {
  let coffeePromise = await fetch('https://api.sampleapis.com/coffee/hot');
  let list = await coffeePromise.json();

  for (let i = 0; i < list.length; i++) {
    let item = document.createElement("div");
    item.classList.add("coffee__item");
    item.append(renderImg(getImage(list[i])));
    item.append(renderCoffeeName(getCoffeeName(list[i])));
    item.append(renderDescription(getDescription(list[i])));
    item.append(renderIngredients(getIngredients(list[i])));
    wrapper.append(item);
  }
}
getCoffee();



// getFuncs
const getCoffeeName = (item) => {
  return item.title;
}
const getDescription = (item) => {
  return item.description;
}
const getImage = (item) => {
  return item.image;
}
const getIngredients = (item) => {
  return item.ingredients;
}


//render
const renderImg = (src) => {
  let wrap = document.createElement("div");
  wrap.classList.add("img__wrap");
  let images = document.createElement("img");
  images.classList.add("coffee__img");
  images.setAttribute("src", src);
  wrap.append(images);
  return wrap;
}

const renderCoffeeName = (src) => {
  let coffee = document.createElement("div");
  coffee.classList.add("coffee__name");
  coffee.innerHTML = src;
  return coffee;
}

const renderDescription = (src) => {
  let description = document.createElement("div");
  description.classList.add("coffee__desc");
  description.innerHTML = src;
  return description;
}

const renderIngredients = (src) => {
  let ingredients = document.createElement("div");
  ingredients.classList.add("coffee__ingr");
  ingredients.innerHTML = src;
  return ingredients;
}

//live search

input.addEventListener("keyup", (event) => {
  liveSearch();

  if (event.code == "Backspace") {
    wrapper.innerHTML = "";
    input.value = "";
    getCoffee();
  }

})

const liveSearch = () => {
  let coffees = document.querySelectorAll(".coffee__item");
  for (let coffee of coffees) {
    let number = coffee;
    let text = coffee.children[1].innerHTML.toLowerCase();
    if (text.includes(input.value.toLowerCase())) {
    } else {
      number.remove();
    }
  }
}

