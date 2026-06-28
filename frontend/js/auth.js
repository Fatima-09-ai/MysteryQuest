// -------------------- REGISTER --------------------

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {

            const res = await fetch(`${API_URL}/auth/register`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    email,
                    password
                })

            });

            const data = await res.json();

            if (res.ok) {

               
localStorage.setItem("token", data.token);

playLogin();

setTimeout(()=>{

    window.location.href="dashboard.html";

},500);



            } else {

                alert(data.message);

            }

        } catch (err) {

            alert("Server Error");

        }

    });

}


// -------------------- LOGIN --------------------

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {

            const res = await fetch(`${API_URL}/auth/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await res.json();

            if (res.ok) {

                localStorage.setItem("token", data.token);

                window.location.href = "dashboard.html";

            } else {

                alert(data.message);

            }

        } catch (err) {

            alert("Server Error");

        }

    });

}