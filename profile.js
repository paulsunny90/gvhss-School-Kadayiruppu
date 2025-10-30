 window.addEventListener("DOMContentLoaded", () => {
      const students = JSON.parse(localStorage.getItem("students")) || [];
      const index = localStorage.getItem("selectedStudentIndex");

      if (index === null || !students[index]) {
        document.body.innerHTML = "<h2 style='text-align:center'>No student found</h2>";
        return;
      }
  

      const s = students[index];
      document.getElementById("profilePic").src = s.pic || "../assets/default-avatar.png";
      document.getElementById("studentName").textContent = s.userName || "Unknown";
      document.getElementById("studentID").textContent = s.userID || "N/A";
      document.getElementById("studentClass").textContent = s.userClass || "N/A";
      document.getElementById("studentEmail").textContent = s.userEmail || "N/A";
      document.getElementById("parentName").textContent = s.parentName || "N/A";
      document.getElementById("parentPhone").textContent = s.parentPhone || "N/A";

      document.getElementById("backBtn").addEventListener("click", () => {
        window.location.href ="/index.html";
      });
    });