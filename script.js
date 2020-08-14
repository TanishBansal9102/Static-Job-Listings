var input = document.querySelector('input');
var list = document.querySelector('.output');
var lis;

input.addEventListener('keypress', checkFunction);

function checkFunction(event) {
  if(event.keyCode == '13') {
    fetch('data.json')
    .then((res) => res.json())
    .then((data) => {
      var companies = data;
      var output = '';
      companies.forEach(company => {
        var categories = [company.languages, company.tools, company.role, company.level];
        if (categories[0].includes(input.value) || categories[1].includes(input.value) || categories[2] == input.value || categories[3] == input.value) {
          for(var i = 0 ; i < categories.length ; i++){
            if(categories[i] == ""){
              categories.splice(i,1);
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
    })
  }
}
