
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

async function loadPuzzle() {

    try {

        // Get logged-in user
        const profileRes = await fetch(`${API_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!profileRes.ok) {

            localStorage.removeItem("token");
            window.location.href = "login.html";
            return;

        }

        const user = await profileRes.json();

        // Get puzzle according to current level
        const puzzleRes = await fetch(
            `${API_URL}/puzzles/level/${user.currentLevel}`
        );

        // All puzzles completed
        if (!puzzleRes.ok) {

            if (typeof playLevel === "function") playLevel();
            if (typeof playAchievement === "function") playAchievement();

            document.getElementById("title").innerText = "🎉 Congratulations!";
            document.getElementById("description").innerText =
                "You have completed all available puzzles.";
            document.getElementById("difficulty").innerText = "";

            document.getElementById("hintBtn").style.display = "none";
            document.getElementById("answer").style.display = "none";
            document.getElementById("submitBtn").style.display = "none";

            return;
        }

        const puzzle = await puzzleRes.json();

        // Display puzzle
        document.getElementById("title").innerText = puzzle.title;
        document.getElementById("description").innerText = puzzle.description;
        document.getElementById("difficulty").innerText = puzzle.difficulty;
        document.getElementById("hint").innerText = "";
        document.getElementById("answer").value = "";

        // Hint Button
        document.getElementById("hintBtn").onclick = () => {

            if (typeof playHint === "function") playHint();

            document.getElementById("hint").innerText = puzzle.hint;

        };

        // Submit Button
        document.getElementById("submitBtn").onclick = async () => {

            const answer = document.getElementById("answer").value.trim();

            if (!answer) {

                alert("Please enter an answer.");
                return;

            }

            const result = await fetch(
                `${API_URL}/puzzles/${puzzle._id}/solve`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        answer
                    })
                }
            );

            const data = await result.json();

            alert(data.message);

            if (data.success) {

                if (typeof playSuccess === "function") playSuccess();

                setTimeout(() => {

                    if (typeof playLevel === "function") playLevel();

                    loadPuzzle();

                }, 1000);

            } else {

                if (typeof playWrong === "function") playWrong();

            }

        };

    }

    catch (err) {

        console.error(err);

        document.getElementById("title").innerText = "Error";
        document.getElementById("description").innerText =
            "Unable to load puzzle.";

    }

}

loadPuzzle();

