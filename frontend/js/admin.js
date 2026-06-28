const token = localStorage.getItem("token");

let editingPuzzleId = null;

// ===============================
// CHECK ADMIN ACCESS
// ===============================

async function checkAdmin() {

    if (!token) {
        window.location.href = "login.html";
        return false;
    }

    try {

        const res = await fetch(`${API_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.ok) {
            window.location.href = "login.html";
            return false;
        }

        const user = await res.json();

        if (user.email !== "fatimahimama09@gmail.com") {

            document.body.innerHTML = `
                <div style="
                    height:100vh;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    background:#111;
                    color:white;
                    font-family:Arial;
                    text-align:center;
                ">
                    <div>
                        <h1 style="color:#b11226;">⛔ ACCESS DENIED</h1>

                        <p>
                            Only the administrator can access this page.
                        </p>

                        <br>

                        <button
                            onclick="window.location='dashboard.html'"
                            style="
                                padding:12px 25px;
                                background:#8b0d1f;
                                color:white;
                                border:none;
                                border-radius:8px;
                                cursor:pointer;
                            ">
                            Back to Dashboard
                        </button>

                    </div>
                </div>
            `;

            return false;
        }

        return true;

    }

    catch (err) {

        console.error(err);

        window.location.href = "login.html";

        return false;

    }

}

// ===============================
// LOAD PUZZLES
// ===============================

async function loadPuzzles() {

    try {

        const res = await fetch(`${API_URL}/admin/puzzles`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

        console.log("Status:", res.status);

        const puzzles = await res.json();

        console.log("Puzzles:", puzzles);

        if (!Array.isArray(puzzles)) {
            alert("Backend didn't return an array.");
            return;
        }

        const table = document.getElementById("puzzleTable");
        table.innerHTML = "";

        puzzles.forEach(puzzle => {

            table.innerHTML += `
                <tr>
                    <td>${puzzle.level}</td>
                    <td>${puzzle.title}</td>
                    <td>${puzzle.difficulty}</td>
                    <td>${puzzle.rewardPoints}</td>
                    <td>
                        <button onclick="editPuzzle('${puzzle._id}')">Edit</button>
                        <button onclick="deletePuzzle('${puzzle._id}')">Delete</button>
                    </td>
                </tr>
            `;

        });

    } catch (err) {

        console.error(err);

    }

}

// ===============================
// EDIT PUZZLE
// ===============================

async function editPuzzle(id) {

    try {

        const res = await fetch(`${API_URL}/puzzles/${id}`);

        const puzzle = await res.json();

        editingPuzzleId = id;

        document.getElementById("title").value = puzzle.title;
        document.getElementById("description").value = puzzle.description;
        document.getElementById("hint").value = puzzle.hint;
        document.getElementById("answer").value = puzzle.answer;
        document.getElementById("difficulty").value = puzzle.difficulty;
        document.getElementById("rewardPoints").value = puzzle.rewardPoints;
        document.getElementById("level").value = puzzle.level;

        document.querySelector("#addPuzzleForm button").innerText =
            "Update Puzzle";

    }

    catch (err) {

        console.error(err);

    }

}

// ===============================
// ADD / UPDATE PUZZLE
// ===============================

document.getElementById("addPuzzleForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const puzzle = {

        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        hint: document.getElementById("hint").value,
        answer: document.getElementById("answer").value,
        difficulty: document.getElementById("difficulty").value,
        rewardPoints: Number(document.getElementById("rewardPoints").value),
        level: Number(document.getElementById("level").value)

    };

    try {

        let url = `${API_URL}/puzzles`;
        let method = "POST";

        if (editingPuzzleId) {

            url = `${API_URL}/puzzles/${editingPuzzleId}`;
            method = "PUT";

        }

        const res = await fetch(url, {

            method,

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(puzzle)

        });

        const data = await res.json();

        alert(data.message || (editingPuzzleId
            ? "Puzzle Updated!"
            : "Puzzle Added!"));

        if (typeof playSuccess === "function") {
            playSuccess();
        }

        editingPuzzleId = null;

        document.getElementById("addPuzzleForm").reset();

        document.querySelector("#addPuzzleForm button").innerText =
            "Add Puzzle";

        loadPuzzles();

    }

    catch (err) {

        console.error(err);

        alert("Something went wrong.");

    }

});

// ===============================
// REFRESH BUTTON
// ===============================

const refreshBtn = document.getElementById("refreshBtn");

if (refreshBtn) {

    refreshBtn.addEventListener("click", async () => {

        if (typeof playClick === "function") {
            playClick();
        }

        await loadPuzzles();

    });

}

// ===============================
// START
// ===============================

(async () => {

    const allowed = await checkAdmin();

    if (!allowed) return;

    loadPuzzles();

})();