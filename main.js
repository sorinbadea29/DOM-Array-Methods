const main = document.getElementById("main");
const addPersonBtn = document.getElementById("add-person");
const doubleMoneyBtn = document.getElementById("double");
const showOnlyMillionairesBtn = document.getElementById("show-millionaires");
const showOnlyNonMillionairesBtn = document.getElementById("show-nonMillionaires");
const sortByRichestBtn = document.getElementById("sort-richest");
const sortByPoorestBtn = document.getElementById("sort-poorest");
const showOnlyFemalesBtn = document.getElementById("show-females");
const showOnlyMalesBtn = document.getElementById("show-males");
const calculateAllWealthBtn = document.getElementById("calculate-wealth");

let persons = [];

const moneyFormat = (number) => `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

async function addRandomPerson() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const person = data.results[0];
  const newPerson = {
    gender: `${person.gender}`,
    name: `${person.name.first} ${person.name.last}`,
    wealth: Math.floor(Math.random() * 1000000),
  };
  addNewPersonToPersons(newPerson);
}

function addNewPersonToPersons(obj) {
  persons.push(obj);
  updateDOM(persons);
}

function doubleMoney() {
  persons = persons.map((person) => {
    return { ...person, wealth: person.wealth * 2 };
  });
  updateDOM(persons);
}

function showOnlyMillionaires() {
  persons = persons.filter((person) => person.wealth >= 1000000);
  updateDOM(persons);
}

function showOnlyNonMillionaires() {
  persons = persons.filter((person) => person.wealth <= 1000000);
  updateDOM(persons);
}

function sortByRichest() {
  const descendent = (a, b) => b.wealth - a.wealth;
  persons.sort(descendent);
  updateDOM(persons);
}

function sortByPoorest() {
  const ascendent = (a, b) => a.wealth - b.wealth;
  persons.sort(ascendent);
  updateDOM(persons);
}

function showOnlyFemales() {
  persons = persons.filter((person) => person.gender === "female");
  updateDOM(persons);
}

function showOnlyMales() {
  const males = (person) => person.gender === "male";
  persons = persons.filter(males);
  updateDOM(persons);
}

function calculateAllWealth() {
  totalWealth = persons.reduce((acc, person) => (acc += person.wealth), 0);
  const totalWealthDiv = document.createElement("div");
  totalWealthDiv.innerHTML = `<h3>Total Wealth:<strong>${moneyFormat(totalWealth)}</strong></h3>`;
  main.appendChild(totalWealthDiv);
}

function updateDOM(persons) {
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
  persons.forEach((person) => {
    const personDiv = document.createElement("div");
    personDiv.classList.add("person");
    const personNameDiv = document.createElement("div");
    personNameDiv.classList.add("personName");
    personNameDiv.innerHTML = `${person.name}`;
    const personWealthDiv = document.createElement("div");
    personWealthDiv.classList.add("personWealth");
    personWealthDiv.innerHTML = `${moneyFormat(person.wealth)}`;
    personDiv.appendChild(personNameDiv);
    personDiv.appendChild(personWealthDiv);
    main.appendChild(personDiv);
  });
}

// Buttons Events
addPersonBtn.addEventListener("click", addRandomPerson);
doubleMoneyBtn.addEventListener("click", doubleMoney);
showOnlyMillionairesBtn.addEventListener("click", showOnlyMillionaires);
showOnlyNonMillionairesBtn.addEventListener("click", showOnlyNonMillionaires);
sortByPoorestBtn.addEventListener("click", sortByPoorest);
sortByRichestBtn.addEventListener("click", sortByRichest);
showOnlyFemalesBtn.addEventListener("click", showOnlyFemales);
showOnlyMalesBtn.addEventListener("click", showOnlyMales);
calculateAllWealthBtn.addEventListener("click", calculateAllWealth);
