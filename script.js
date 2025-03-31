document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.createElement("button");
    darkModeToggle.textContent = "🌙 Dark Mode";
    darkModeToggle.id = "dark-mode-toggle";
    document.body.insertBefore(darkModeToggle, document.body.firstChild);

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            darkModeToggle.textContent = "☀ Light Mode";
        } else {
            darkModeToggle.textContent = "🌙 Dark Mode";
        }
    });

    // Smooth scrolling for nav links
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});
