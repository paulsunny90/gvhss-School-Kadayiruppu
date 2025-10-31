 window.addEventListener("DOMContentLoaded", () => {
      const students = JSON.parse(localStorage.getItem("students")) || [];
      const index = localStorage.getItem("selectedStudentIndex");
      

      if (index === null || !students[index]) {
        document.body.innerHTML = "<h2 style='text-align:center'>No student found</h2>";
        return;
      }
  

      const student = students[index];

      document.getElementById("profilePic").src = student.pic || "../assets/default-avatar.png";
      document.getElementById("studentName").textContent = student.userName || "Unknown";
      document.getElementById("studentID").textContent = student.userID || "N/A";
      document.getElementById("studentClass").textContent = student.userClass || "N/A";
      document.getElementById("studentEmail").textContent = student.userEmail || "N/A";
      document.getElementById("parentName").textContent = student.parentName || "N/A";
      document.getElementById("parentPhone").textContent = student.parentPhone || "N/A";
      document.getElementById("address").textContent = student.address || "N/A";

      document.getElementById("backBtn").addEventListener("click", () => {
        window.location.href ="index.html";
      });
    });