async function loadLeaderboard() {

    try {

        const res = await fetch(`${API_URL}/auth/leaderboard`);

        const users = await res.json();

        const body = document.getElementById("leaderboardBody");

        body.innerHTML = "";

        users.forEach((user, index) => {

            let medal = "";

            if (index === 0) medal = "🥇";
            else if (index === 1) medal = "🥈";
            else if (index === 2) medal = "🥉";
            else medal = index + 1;

            body.innerHTML += `
                <tr>
                    <td>${medal}</td>
                    <td>${user.username}</td>
                    <td>${user.currentLevel}</td>
                    <td>${user.points}</td>
                </tr>
            `;

        });

    } catch (err) {

        console.log(err);

    }

}

loadLeaderboard();