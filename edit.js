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

const Param=new URLSearchParams(window.location.href)
 console.log(Param.get('id'));
 const index = Param.get('id')


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

  //  image 
  const fileInput = document.getElementById("userImage");
  const preview = document.getElementById("preview-userImage");

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      preview.src = URL.createObjectURL(file);
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
      preview.src = "";
    }
  });
  // Cancel button
  document.getElementById("cancel").addEventListener("click", () => {
    window.location.href = index !== null ? `./profile.html?id=${index}` : "../index.html";
  });

  // data editing
  if (index !== null) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const currentStudent = students[index];

    if (currentStudent) {
      document.getElementById("userName").value = currentStudent.userName || "";
      document.getElementById("userID").value = currentStudent.userID || "";
      document.getElementById("userDob").value = currentStudent.userDob || "";
      document.getElementById("userClass").value = currentStudent.userClass || "";
      document.getElementById("userEmail").value = currentStudent.userEmail || "";
      document.getElementById("parentName").value = currentStudent.parentName || "";
      document.getElementById("parentPhone").value = currentStudent.parentPhone || "";

      if (currentStudent.pic) {
        preview.src = currentStudent.pic;
        preview.style.display = "block";
      }
    }
  }
}

setInputs();

// Add  Edi
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let obj = {};
  let inputs = document.querySelectorAll("#form input");

  inputs.forEach(input => {
    if (input.type !== "file" && input.type !== "submit") {
      obj[input.id] = input.value;
    }
  });

  const students = JSON.parse(localStorage.getItem("students")) || [];
  const fileInput = document.getElementById("userImage");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      obj.pic = event.target.result;
      saveStudent(obj, students);
    };
    reader.readAsDataURL(file);
  } else {
    if (index !== null && students[index] && students[index].pic) {
      obj.pic = students[index].pic; // Keep 
    } else {
      obj.pic = "";
    }
    saveStudent(obj, students);
  }
});

// Save 
function saveStudent(obj, students) {
  if (index !== null && students[index]) {
    students[index] = obj; // Update
  } else {
    students.push(obj); // Add 
  }
  localStorage.setItem("students", JSON.stringify(students));

  //  back 
  if (index !== null) {
    window.location.href = `./profile.html?&id=${index}`;
  } else {
    window.location.href = "../index.html";
  }
}