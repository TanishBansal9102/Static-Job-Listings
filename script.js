var output = '';
var inputData;
var companies = [];
const roles = ["Frontend", "Backend", "Fullstack"];
var dataRole = null;
const levels = ["Junior", "Midweight", "Senior"];
var dataLevel = null;
const languages = ["Python", "Ruby", "JavaScript", "HTML", "CSS"];
var dataLanguage = null;
const tools = ["React", "Sass", "Vue", "Django", "RoR"];
var dataTool = null;
var input = document.querySelector('input');
var list = document.querySelector('.output');

fetch('data.json')
  .then((res) => res.json())
  .then((data) => {
    companies = data;
  })
  
input.addEventListener('keypress', checkFunction);

function checkFunction(event) {
  if (event.keyCode == '13')checker();
}  

function checker() {
  inputData = input.value.split(" ");
  undefiner();
  arrayAssigner();
  // console.log(inputData);
  output = '';
  companies.forEach(company => {
    // console.log(dataLanguage, dataRole, dataTool, dataLevel);
    var categories = [company.languages, company.tools, company.role, company.level];
    if (dataLanguage == null && dataLevel == null && dataRole == null && dataTool == null) {
      outputer(company);
    } else {
      if ((categories[0].includes(dataLanguage) || dataLanguage == null) &&
        (categories[1].includes(dataTool) || dataTool == null) &&
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
  dataLanguage = null;
  dataTool = null;
}

function arrayAssigner() {
  for (var i = 0 ; i < inputData.length ; i++){
    if (roles.includes(inputData[i]) && dataRole == null) {
      dataRole = inputData[i];
    } else if (levels.includes(inputData[i]) && dataLevel == null) {
      dataLevel = inputData[i];
    } else if (languages.includes(inputData[i]) && dataLanguage == null) {
      dataLanguage = inputData[i];
    } else if (tools.includes(inputData[i]) && dataTool == null) {
      dataTool = inputData[i];
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