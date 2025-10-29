let form = document.querySelector("form");
let data = JSON.parse(localStorage.getItem("studentData")) || [];
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let formData = new FormData(form);
  let student = {};
  formData.forEach((value, key) => {
    student[key] = value;
  });
  data.push(student);
  localStorage.setItem("studentData", JSON.stringify(data));
  form.reset();
});
 function Buttions(){
    let arre=JSON.parse(localStorage.getItem("studentData"))||[];
    let data=document.getElementById("list")
    HTML=""
    arre.forEach((element,b)=> {
    let table=`<tr>
                  <th>${element.name}</th>
                  <th>${element.age}</th>
                  <th>${element.department}</th>
                  <th>${element.salary}</th>
                  <td><button onclick="edit(${b})">edit</button><button onclick="deletee(${b})">delete</button></td>
              </tr>`
             HTML +=table;
    });
    data.innerHTML= HTML;
}