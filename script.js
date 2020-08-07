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
  number => `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

async function fetchRandomPerson(e){
  e.preventDefault();
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const person = data.results[0];
  newPerson = {
    gender: person.gender,
    name: `${person.name.first} ${person.name.last}`,
    wealth: Math.floor(Math.random()* 1000000)
  }
  pushToPersonsArray(newPerson);
  updateDOM(persons);
}

function pushToPersonsArray(newPersonObj){
  persons.push(newPersonObj);
}

function doubleMoney(){
  persons = persons.map(person => {
    return {...person, wealth: person.wealth * 2}
  })
  updateDOM(persons);
}

function showOnlyMillionaires(){
  persons = persons.filter(person => person.wealth >= 1000000);
  updateDOM(persons);
}

function showOnlyNonMillionaires(){
  persons = persons.filter(person => person.wealth < 1000000);
  updateDOM(persons)
}

function sortByRichest(){
  const desc = (a, b) => (b.wealth - a.wealth);
  persons.sort(desc)
  updateDOM(persons)
}

function sortByPoorest(){
  const asc = (a, b) => (a.wealth - b.wealth);
  persons.sort(asc);
  updateDOM(persons)
}

function showOnlyFemales(){
  persons = persons.filter(person => person.gender === 'female');
  updateDOM(persons);
}

function showOnlyMales(){
  persons = persons.filter(person => person.gender === 'male');
  updateDOM(persons);
}

function calculateEntireWealth(){
  const total = persons
    .map(person => person.wealth)
    .reduce((acc, item) => (acc += item))
  const totalEl = document.createElement('div');
  totalEl.innerHTML = `<h3><strong>Total: </strong>${formatMoney(total)}</h3>`;
  main.appendChild(totalEl);
}

function updateDOM(persons){
  main.innerHTML = `
    <h2><strong>Person</strong>Wealth</h2>
    <ul>${persons.map(person => `
      <li>
        <strong>${person.name}</strong>
        <p>${formatMoney(person.wealth)}</p>
      </li>`).join('')}
    </ul>
  `;
};

// Event Listeners
addPersonBtn.addEventListener('click', fetchRandomPerson);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showOnlyMillionairesBtn.addEventListener('click', showOnlyMillionaires);
showOnlyNonMillionairesBtn.addEventListener('click', showOnlyNonMillionaires);
sortByRichestBtn.addEventListener('click', sortByRichest);
sortByPoorestBtn.addEventListener('click', sortByPoorest);
showOnlyFemalesBtn.addEventListener('click', showOnlyFemales);
showOnlyMalesBtn.addEventListener('click', showOnlyMales);
calculateAllWealthBtn.addEventListener('click', calculateEntireWealth);
