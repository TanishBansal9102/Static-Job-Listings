var output;
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

fetcher();

input.addEventListener('keypress', checkFunction);

function fetcher() {
  fetch('data.json')
    .then((res) => res.json())
    .then((data) => {
      companies = data;
    })
}

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
    if ((categories[0].includes(dataLanguage) || dataLanguage == null) && 
    (categories[1].includes(dataTool) || dataTool == null) && 
      (categories[2] == dataRole || dataRole == null) && 
      (categories[3] == dataLevel || dataLevel == null)) {
      for (var i = 0; i < categories.length; i++) {
        if (categories[i] == "") {
          categories.splice(i, 1);
        }
      }
      output += `<ul>`
      categories.forEach(category => {
        output += `<li>${category}</li>`
      });
      output += `</ul>`;
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
      continue;
    } else if (levels.includes(inputData[i]) && dataLevel == null) {
      dataLevel = inputData[i];
      continue;
    } else if (languages.includes(inputData[i]) && dataLanguage == null) {
      dataLanguage = inputData[i];
      continue;
    } else if (tools.includes(inputData[i]) && dataLevel == null) {
      dataTool = inputData[i];
      continue;
    }
  }
}