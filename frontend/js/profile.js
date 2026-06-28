const token = localStorage.getItem("token");

if (!token) {
    window.location = "login.html";
}

async function loadProfile() {

    try {

        const res = await fetch(`${API_URL}/auth/profile`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const user = await res.json();

        if (!res.ok) {
            alert(user.message);
            window.location = "login.html";
            return;
        }

        document.getElementById("username").innerText = user.username;
        document.getElementById("email").innerText = user.email;
        document.getElementById("points").innerText = user.points;
        document.getElementById("level").innerText = user.currentLevel;

        document.getElementById("achievements").innerText =
            user.achievements ? user.achievements.length : 0;

    } catch (err) {

        console.error(err);

        alert("Unable to load profile.");

    }

}

loadProfile();