window.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector(".game-board");
  const students = JSON.parse(localStorage.getItem("students")) || []; 

  if (students.length === 0) {
    cardsContainer.innerHTML = "<p class='empty'>No student added yet.</p>";
    return;
  }

 
  cardsContainer.innerHTML = students.map((student, index) => `
    <div class="box" onclick="openProfile(${index})">
      <div class="Student-img">
        <img src="${student.pic || './assets/default-profile.png'}" alt="Student Image">
      </div>
      <h3>${student.userName || "Unknown"}</h3>
      <p><strong>Class:</strong> ${student.userClass || "N/A"}</p>
    </div>
  `).join("");
});


function openProfile(index) {
  localStorage.setItem("selectedStudentIndex", index);
  window.location.href = "./pages/profile.html";
}







