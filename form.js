let student = [
  { name: "Full Name", id: "userName", placeholder: "Full Name", type: "text" },
  { name: "Student ID", id: "userID", placeholder: "Student ID", type: "text" },
  { name: "Date of Birth", id: "userDob", placeholder: "Date of Birth", type: "date" },
  { name: "Class/Grade Level", id: "userClass", placeholder: "Class/Grade Level", type: "text" },
  { name: "Email Address", id: "userEmail", placeholder: "Email Address", type: "email" },
  { name: "Parent/Guardian Name", id: "parentName", placeholder: "Parent/Guardian Name", type: "text" },
  { name: "Parent/Guardian Phone", id: "parentPhone", placeholder: "Parent/Guardian Phone", type: "tel" },
  { name: "Profile Picture", id: "userImage", placeholder: "Choose Image", type: "file" },
  { name: "submit", id: "submit", placeholder: "Submit", type: "submit" }
];



function setInputs() {
  let str = "";

  student.forEach(field => {
    if (field.type === "submit") {
      str += `
        <div class="buttons-all">
          <button type="button" class="cancel" id="cancel">Cancel</button>
          <button type="submit" class="submit">${field.placeholder}</button>
        </div>`;
    } 
    else if (field.type === "file") {
      str += `
        <div class="image-upload">
          <label for="${field.id}">${field.placeholder}</label>
          <input id="${field.id}" type="file" accept="image/*">
          <div class="preview-container">
            <img id="preview-${field.id}" alt="Preview" 
                 style="display:none; width:200px; height:200px;  object-fit:cover; margin-top:10px;">
          </div>
        </div>`;
    } 
    else {
      str += `
        <div>
          <label for="${field.id}">${field.placeholder}</label>
          <input name="${field.name}" id="${field.id}" placeholder="${field.placeholder}" type="${field.type}" required>
        </div>`;
    }
  });

  document.getElementById("form").innerHTML = str;

  // Handle image preview
  // const fileInput = document.getElementById("userImage");
  // const preview = document.getElementById("preview-userImage");

  // fileInput.addEventListener("change", () => {
  //   const file = fileInput.files[0];
  //   if (file) {
  //     preview.src = URL.createObjectURL(file);
  //     preview.style.display = "block";
  //   } else {
  //     preview.style.display = "none";
  //     preview.src = "";
  //   }
  // });

  // Cancel button
  document.getElementById("cancel").addEventListener("click", () => {
    document.getElementById("form").reset();
    // preview.style.display = "none";
    // preview.src = "";
    window.location.href = "../index.html";
  });
}



setInputs();

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let obj = {};
  let inputs = document.querySelectorAll("#form input");

  inputs.forEach(input => {
    if (input.type !== "file" && input.type !== "submit") {
      obj[input.id] = input.value;
    }
  });

  let fileInput = document.getElementById("userImage");
  let file = fileInput.files[0];

  if (file) {
    let reader = new FileReader();
    reader.onload = function(event) {
      obj.pic = event.target.result;
      saveStudent(obj);
    };
    reader.readAsDataURL(file);
  } else {
    obj.pic = "";
    saveStudent(obj);
  }
});

function saveStudent(studentObj) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(studentObj);
  localStorage.setItem("students", JSON.stringify(students));

  alert("Student data saved successfully!");
   
  window.location.href = "../index.html";
}

