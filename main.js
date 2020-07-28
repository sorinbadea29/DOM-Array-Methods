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

const formatMoney = 
  number => `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`

async function addRandomPerson(){
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const person = data.results[0];
  const newPerson = {
    gender: `${person.gender}`,
    name: `${person.name.first} ${person.name.last}`,
    wealth: Math.floor(Math.random() * 1000000)
  }
  pushInArray(newPerson);
  updateDOM(persons);
}

function pushInArray(personObj){
  persons.push(personObj);
}

function updateDOM(persons){
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
  persons.forEach(person => {
    const personDiv = document.createElement('div');  
    personDiv.classList.add('person');
    const personNameDiv = document.createElement('div');  
    personNameDiv.classList.add('personName');
    const personWealthDiv = document.createElement('div');  
    personWealthDiv.classList.add('personWealth');
    personNameDiv.innerHTML = `<strong>${person.name}</strong>`;
    personWealthDiv.innerHTML = `<p>${formatMoney(person.wealth)}</p>`;
    personDiv.appendChild(personNameDiv);
    personDiv.appendChild(personWealthDiv);
    main.appendChild(personDiv);
  })
};

function doubleMoney(){
  persons = persons.map(person => {
    return {...person, wealth: person.wealth* 2}
  })
  updateDOM(persons);
}

function showOnlyMillionaires(){
  const millionaires = person => person.wealth >= 1000000;
  persons = persons.filter(millionaires);
  updateDOM(persons);
}

function showOnlyNonMillionaires(){
  const nonMillionaires = person => person.wealth <= 1000000;
  persons = persons.filter(nonMillionaires);
  updateDOM(persons);
}

function sortByRichest(){
  const desc = (a, b) => b.wealth - a.wealth;
  persons.sort(desc);
  updateDOM(persons);
}

function sortByPoorest(){
  const asc = (a, b) => a.wealth - b.wealth;
  persons.sort(asc);
  updateDOM(persons);
}

function showOnlyFemales(){
  const females = person => person.gender === 'female';
  persons = persons.filter(females);
  updateDOM(persons);
}

function showOnlyMales(){
  const males = person => person.gender === 'male';
  persons = persons.filter(males);
  updateDOM(persons);
}

function calculateEntireWealth(){
  const total = ((acc, item) => (acc += item));
  const totalWealth = persons
    .map(person => person.wealth)
    .reduce((total), 0);
  const totalEl = document.createElement('div');
  totalEl.innerHTML = `
    <h3><strong>Total Wealth: </strong>${formatMoney(totalWealth)}</h3>`;
  main.appendChild(totalEl);
}

// Buttons Events
addPersonBtn.addEventListener("click", addRandomPerson);
doubleMoneyBtn.addEventListener("click", doubleMoney);
showOnlyMillionairesBtn.addEventListener("click", showOnlyMillionaires);
showOnlyNonMillionairesBtn.addEventListener("click", showOnlyNonMillionaires);
sortByRichestBtn.addEventListener("click", sortByRichest);
sortByPoorestBtn.addEventListener("click", sortByPoorest);
showOnlyFemalesBtn.addEventListener("click", showOnlyFemales);
showOnlyMalesBtn.addEventListener("click", showOnlyMales);
calculateAllWealthBtn.addEventListener("click", calculateEntireWealth);
