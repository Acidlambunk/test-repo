let selectedRole = "";

// Function to handle role selection
function selectRole(role) {
    selectedRole = role;
    console.log("Selected Role:", selectedRole); // Log selected role
    document.getElementById("question1").classList.add("hidden"); // Hide question 1
    document.getElementById("question2").classList.remove("hidden"); // Show question 2
}

// Function to ask for the user's name
function askNextQuestion() {
    const name = document.getElementById("nameInput").value.trim();
    if (!name) {
        alert("Please enter your name."); // Alert if name is empty
        return;
    }
    console.log("Entered Name:", name); // Log entered name

    document.getElementById("question2").classList.add("hidden"); // Hide question 2

    // Show next question based on selected role
    if (selectedRole === "student") {
        document.getElementById("question3").classList.remove("hidden"); // Show question 3
    } else if (selectedRole === "teacher") {
        document.getElementById("question6").classList.remove("hidden"); // Show question 6
    }
}

// Function to redirect student based on selection
function redirectStudent() {
    console.log("Redirect Student function called"); // Ensure this only logs for students
    const subjects = document.querySelectorAll("input[name='studentSubjects']:checked");
    if (subjects.length === 0) {
        alert("Please select at least one subject.");
        return;
    }
    const selectedSubjects = Array.from(subjects).map(input => input.value);
    console.log("Selected Subjects (Student):", selectedSubjects);
    window.location.href = "student-teacher-dashboard.html";
}


// Function for teacher to input teaching location
function nextTeacherQuestion() {
    const location = document.getElementById("teachingLocation").value.trim();
    if (!location) {
        alert("Please enter your teaching location."); // Alert if location is empty
        return;
    }
    console.log("Teaching Location:", location); // Log teaching location
    document.getElementById("question6").classList.add("hidden"); // Hide question 6
    document.getElementById("question7").classList.remove("hidden"); // Show question 7
}

// Function to redirect based on role and selected subjects
function redirectBasedOnRole() {
    const subjects = document.querySelectorAll("input[name='teachSubjects']:checked");
    if (subjects.length === 0) {
        alert("Please select at least one subject."); // Alert if no subjects selected
        return;
    }

    // Log selected subjects for teaching
    const selectedTeachSubjects = Array.from(subjects).map(input => input.value);
    console.log("Selected Subjects (Teacher):", selectedTeachSubjects);
    window.location.href = "teacher-dashboard.html"; // Redirect to teacher dashboard
}


