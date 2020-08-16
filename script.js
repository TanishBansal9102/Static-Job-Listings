var output = '';
var inputData;
var companies = [];
const roles = ["Frontend", "Backend", "Fullstack"];
var dataRole = null;
const levels = ["Junior", "Midweight", "Senior"];
var dataLevel = null;
const languages = ["Python", "Ruby", "JavaScript", "HTML", "CSS"];
var dataLanguages = [];
const tools = ["React", "Sass", "Vue", "Django", "RoR"];
var dataTools = [];
var input = document.querySelector('#enter');
var list = document.querySelector('.output');
var clear = document.querySelector('#clear');

fetch('data.json')
  .then((res) => res.json())
  .then((data) => {
    companies = data;
    companies.forEach(company => {
      outputer(company);
      list.innerHTML = output;
    });
  })

input.addEventListener('keypress', checkFunction);

clear.addEventListener('click', function() {
  input.value = "";
  undefiner();
  list.innerHTML = " ";
  fetch('data.json')
    .then((res) => res.json())
    .then((data) => {
      companies = data;
      output= '';
      companies.forEach(company => {
        outputer(company);
        list.innerHTML = output;
      });
    })
  });

function checkFunction(event) {
  if (event.keyCode == '13') checker();
}

function checker() {
  inputData = input.value.split(" ");
  undefiner();
  arrayAssigner();
  output = '';
  companies.forEach(company => {
    var categories = [company.languages, company.tools, company.role, company.level];
    if (dataLanguages == [] && dataLevel == null && dataRole == null && dataTools == []) {
      outputer(company);
    } else {
      if ((includeChecker(categories[0], dataLanguages) || dataLanguages == []) &&
        (includeChecker(categories[1], dataTools) || dataTools == []) &&
        (categories[2] == dataRole || dataRole == null) &&
        (categories[3] == dataLevel || dataLevel == null)) {
        for (var i = 0; i < categories.length; i++) {
          if (categories[i] == "") {
            categories.splice(i, 1);
          }
        }
        outputer(company);
      }
    }

  })
  list.innerHTML = output;
}

function undefiner() {
  dataRole = null;
  dataLevel = null;
  dataLanguages = [];
  dataTools = [];
}

function arrayAssigner() {
  for (var i = 0; i < inputData.length; i++) {
    var input = inputData[i].charAt(0).toUpperCase() + inputData[i].slice(1);
    if (roles.includes(input) && dataRole == null) {
      dataRole = input;
    } else if (levels.includes(input) && dataLevel == null) {
      dataLevel = input;
    } else if (languages.includes(input)) {
      dataLanguages.push(input);
    } else if (tools.includes(input)) {
      dataTools.push(input);
    }
  }
}

function outputer(company) {
  output += `
      <div class="company">
        <img src="${company.logo}" alt="">
        <p class="heading">${company.company}</p>
        `
  if (company.new) output += `<p class="new">New!</p>`;
  if (company.featured) output += `<p class="featured">Featured!</p>`
  output += `
        <br>
        <p class="position">${company.position}</p>
        <div class="roles">
          <p>${company.role}</p>
          <p>${company.level}</p>`
  company.languages.forEach(language => {
    output += `<p>${language}</p>`
  });
  company.tools.forEach(tool => {
    output += `<p>${tool}</p>`
  })
  output += ` </div>
        <div class="info">
          <p>${company.postedAt}  .  ${company.contract}  .  ${company.location}</p>
        </div>
      </div>
      `;
}

function includeChecker(category, arr) {
  var c = 0;
  arr.forEach(element => {
    if(category.includes(element))c++;
  });
  if(c == arr.length)return true;
  else return false;
}