document.addEventListener("DOMContentLoaded", () => {
    const timetable = loadSchedule();

    if (timetable) {
        document.getElementById("lesson1").querySelector("p:last-child").innerText = timetable.lesson1 || "N/A";
        document.getElementById("lesson2").querySelector("p:last-child").innerText = timetable.lesson2 || "N/A";
        document.getElementById("lesson3").querySelector("p:last-child").innerText = timetable.lesson3 || "N/A";
        document.getElementById("lesson4").querySelector("p:last-child").innerText = timetable.lesson4 || "N/A";
        document.getElementById("lesson5").querySelector("p:last-child").innerText = timetable.lesson5 || "N/A";
        document.getElementById("lesson6").querySelector("p:last-child").innerText = timetable.lesson6 || "N/A";
        document.getElementById("lesson7").querySelector("p:last-child").innerText = timetable.lesson7 || "N/A";

        highlightCurrentLesson();
    } else {
        alert("No timetable set for today.");
    }
});

function loadSchedule() {
    const today = new Date();
    const options = { weekday: 'long' };
    const dayName = today.toLocaleDateString('en-AU', options);
    return JSON.parse(localStorage.getItem(dayName));
}

function highlightCurrentLesson() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute; // Convert time to minutes

    const lessons = [
        { start: { hour: 8, minute: 40 }, end: { hour: 9, minute: 30 }, id: "lesson1" },
        { start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 10 }, id: "lesson2" },
        { start: { hour: 10, minute: 10 }, end: { hour: 10, minute: 50 }, id: "lesson3" },
        { start: { hour: 10, minute: 50 }, end: { hour: 11, minute: 10 }, id: "recess" },
        { start: { hour: 11, minute: 10 }, end: { hour: 12, minute: 0 }, id: "lesson4" },
        { start: { hour: 12, minute: 0 }, end: { hour: 12, minute: 50 }, id: "lesson5" },
        { start: { hour: 12, minute: 50 }, end: { hour: 1, minute: 35 }, id: "lunch" },
        { start: { hour: 1, minute: 35 }, end: { hour: 2, minute: 25 }, id: "lesson6" },
        { start: { hour: 2, minute: 25 }, end: { hour: 3, minute: 15 }, id: "lesson7" },
    ];

    lessons.forEach(lesson => {
        const lessonStart = lesson.start.hour * 60 + lesson.start.minute;
        const lessonEnd = lesson.end.hour * 60 + lesson.end.minute;

        if (currentTime >= lessonStart && currentTime < lessonEnd) {
            const lessonElement = document.getElementById(lesson.id);
            lessonElement.classList.add("highlight");
        }
    });
}