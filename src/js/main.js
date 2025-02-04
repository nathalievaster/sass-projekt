 "use strict"

// Hämtar elementen
let openButton = document.getElementById("open-menu");
let closeButton = document.getElementById("close-menu");

//Lägger till eventlyssnare
openButton.addEventListener('click', toggleMenu);
closeButton.addEventListener('click', toggleMenu);

// Skapar funktionen som fungerar på båda knapparna
function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");
    navMenuEl.classList.toggle("open")

    let style = window.getComputedStyle(navMenuEl);
    if (style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

/* Skriver ut kurserna */

let courses = [];
let sortOrder = 1;

window.onload = () => {
    loadCourses();
    document.querySelector("#sortName").addEventListener("click", () => sortCourses("name"));
}

async function loadCourses() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        if (!response.ok) {
            throw new Error("Fel vid anslutning till JSON-data...");
        }
        courses = await response.json();
        printCourses (courses);

    } catch(error){
        console.error(error)
        document.querySelector("#error").innerHTML = "<p>Just nu har vi problem med anslutning - försök igen senare.</p>";
    }
}

function printCourses (data) {
    const courseEl = document.querySelector("#courseTableBody");
    courseEl.innerHTML = "";

    data.forEach(course => {
        const row = document.createElement("tr"); // Skapa en ny rad

        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.coursename}</td>
            <td>${course.progression}</td>
        `;

        courseEl.appendChild(row); // Lägg till raden i tabellen
    });
}

function sortCourses(name) {
    courses.sort((a, b) => (a.coursename > b.coursename ? 1 : -1) * sortOrder);
    sortOrder *= -1; // Växla mellan stigande och fallande
    printCourses(courses);
}