document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("timetable-form");
    const currentTimetable = document.getElementById("current-timetable");

    // Load timetable from local storage
    loadTimetable();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const day = document.getElementById("day").value; // Get selected day
        const lessons = {
            lesson1: document.getElementById("lesson1").value,
            lesson2: document.getElementById("lesson2").value,
            lesson3: document.getElementById("lesson3").value,
            lesson4: document.getElementById("lesson4").value,
            lesson5: document.getElementById("lesson5").value,
            lesson6: document.getElementById("lesson6").value,
            lesson7: document.getElementById("lesson7").value,
        };
    
        // Save timetable to localStorage for the selected day
        localStorage.setItem(day, JSON.stringify(lessons));
    
        // Alert and reload timetable display
        alert("Timetable saved!");
        loadTimetable();
    });    

    function loadTimetable() {
        const today = new Date();
        const options = { weekday: 'long' };
        const dayName = today.toLocaleDateString('en-AU', options);

        const timetable = JSON.parse(localStorage.getItem(dayName));

        if (timetable) {
            currentTimetable.innerHTML = `
                <strong>${dayName}:</strong><br>
                Lesson 1: ${timetable.lesson1}<br>
                Lesson 2: ${timetable.lesson2}<br>
                Lesson 3: ${timetable.lesson3}<br>
                Lesson 4: ${timetable.lesson4}<br>
                Lesson 5: ${timetable.lesson5}<br>
                Lesson 6: ${timetable.lesson6}<br>
                Lesson 7: ${timetable.lesson7}
            `;
        } else {
            currentTimetable.innerHTML = `No timetable set for ${dayName}.`;
        }
    }
});