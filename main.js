document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("tutorialModal");
    const closeButton = document.getElementsByClassName("close-button")[0];
    const steps = document.querySelectorAll(".step");
    let currentStep = 0;

    // Function to show the tutorial modal
    function showTutorial() {
        console.log("Showing tutorial.");
        currentStep = 0;
        steps.forEach(step => step.classList.remove("active"));
        steps[currentStep].classList.add("active");
        updateStepCounter();
        updateButtonState();
        modal.style.display = "block";
    }

    // Close the modal when the close button is clicked
    closeButton.onclick = function() {
        handleTutorialClose();
    }

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            handleTutorialClose();
        }
    }

    window.changeStep = function(n) {
        steps[currentStep].classList.remove("active");
        currentStep = currentStep + n;
        if (currentStep >= steps.length) {
            currentStep = steps.length - 1;
        }
        if (currentStep < 0) {
            currentStep = 0;
        }
        steps[currentStep].classList.add("active");
        updateStepCounter();
        updateButtonState();
    }

    function updateStepCounter() {
        document.getElementById("stepCounter").innerText = `Page ${currentStep + 1} of ${steps.length}`;
    }

    function updateButtonState() {
        const prevButton = document.getElementById("prevButton");
        const nextButton = document.getElementById("nextButton");

        if (currentStep === 0) {
            prevButton.disabled = true;
            prevButton.style.backgroundColor = "#ccc";
        } else {
            prevButton.disabled = false;
            prevButton.style.backgroundColor = "#003366";
        }

        if (currentStep === steps.length - 1) {
            nextButton.innerText = "Finish";
            nextButton.style.backgroundColor = "#003366";
        } else {
            nextButton.innerText = "Next";
            nextButton.style.backgroundColor = "#003366";
        }
    }

    function handleTutorialClose() {
        const disableTutorialCheckbox = document.getElementById("disableTutorial");
        if (disableTutorialCheckbox.checked) {
            console.log("Checkbox checked. Setting tutorialViewed flag.");
            localStorage.setItem("tutorialViewed", "true");
        } else {
            console.log("Checkbox not checked. Not setting tutorialViewed flag.");
        }
        modal.style.display = "none";
    }

    // Show tutorial modal when the "Show Tutorial" button is clicked
    const showTutorialButton = document.getElementById("showTutorialButton");
    if (showTutorialButton) {
        showTutorialButton.onclick = function() {
            showTutorial();
        }
    }

    // Existing code for loading the timetable and highlighting the current lesson
    const timetable = loadSchedule();
    if (timetable) {
        // Dynamically populate the lessons using the loaded timetable
        document.getElementById("lesson1").querySelector("p:last-child").innerText = timetable.lesson1 || "N/A";
        document.getElementById("lesson2").querySelector("p:last-child").innerText = timetable.lesson2 || "N/A";
        document.getElementById("lesson3").querySelector("p:last-child").innerText = timetable.lesson3 || "N/A";
        document.getElementById("lesson4").querySelector("p:last-child").innerText = timetable.lesson4 || "N/A";
        document.getElementById("lesson5").querySelector("p:last-child").innerText = timetable.lesson5 || "N/A";
        document.getElementById("lesson6").querySelector("p:last-child").innerText = timetable.lesson6 || "N/A";
        document.getElementById("lesson7").querySelector("p:last-child").innerText = timetable.lesson7 || "N/A";
        
        highlightCurrentLesson();  // Highlight the current lesson based on the time
    } else {
        alert("No timetable set for today.");
    }
});

function loadSchedule() {
    const today = new Date();
    const options = { weekday: 'long' };
    const dayName = today.toLocaleDateString('en-AU', options); // Ensure it returns "Monday", "Tuesday", etc.

    // Retrieve the timetable from localStorage
    const timetable = JSON.parse(localStorage.getItem(dayName));

    // If no timetable is found, return null
    return timetable;
}

function highlightCurrentLesson() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute; // Convert time to minutes for easy comparison

    const lessons = [
        { start: { hour: 8, minute: 40 }, end: { hour: 9, minute: 30 }, id: "lesson1" },
        { start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 10 }, id: "lesson2" },
        { start: { hour: 10, minute: 10 }, end: { hour: 10, minute: 50 }, id: "lesson3" },
        { start: { hour: 10, minute: 50 }, end: { hour: 11, minute: 10 }, id: "recess" },
        { start: { hour: 11, minute: 10 }, end: { hour: 12, minute: 0 }, id: "lesson4" },
        { start: { hour: 12, minute: 0 }, end: { hour: 12, minute: 50 }, id: "lesson5" },
        { start: { hour: 12, minute: 50 }, end: { hour: 13, minute: 35 }, id: "lunch" },
        { start: { hour: 13, minute: 35 }, end: { hour: 14, minute: 25 }, id: "lesson6" },
        { start: { hour: 14, minute: 25 }, end: { hour: 15, minute: 15 }, id: "lesson7" },
    ];

    // Loop through lessons and highlight the current one
    lessons.forEach(lesson => {
        const lessonStart = lesson.start.hour * 60 + lesson.start.minute;
        const lessonEnd = lesson.end.hour * 60 + lesson.end.minute;

        if (currentTime >= lessonStart && currentTime < lessonEnd) {
            const lessonElement = document.getElementById(lesson.id);
            if (lessonElement) {
                lessonElement.classList.add("highlight"); // Add a class to highlight the lesson
            }
        }
    });
}