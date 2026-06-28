
const token = localStorage.getItem("token");

// If no token, go to login
if (!token) {
    window.location.href = "login.html";
}

async function loadDashboard() {

    try {

        const res = await fetch(`${API_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Token invalid or expired
        if (!res.ok) {

            localStorage.removeItem("token");
            window.location.href = "login.html";
            return;

        }

        const user = await res.json();

        document.getElementById("username").innerText = user.username;
        document.getElementById("points").innerText = user.points;
        document.getElementById("level").innerText = user.currentLevel;

        const achievementCount = Array.isArray(user.achievements)
            ? user.achievements.length
            : 0;

        document.getElementById("achievements").innerText = achievementCount;

        const completed = Math.max(0, user.currentLevel - 1);

        document.getElementById("completed").innerText = completed;
        document.getElementById("progressBar").value = completed;

    }

    catch (err) {

        console.error(err);

        localStorage.removeItem("token");

        window.location.href = "login.html";

    }

}

// Load dashboard
loadDashboard();

// Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        if (typeof playLogout === "function") {

            playLogout();

            setTimeout(() => {

                localStorage.removeItem("token");
                window.location.href = "login.html";

            }, 400);

        } else {

            localStorage.removeItem("token");
            window.location.href = "login.html";

        }

    });

}

