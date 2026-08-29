const users = [
    {
        email: "superadmin@example.com",
        password: "Demo123",
        role: "Super Admin"
    },

    {
        email: "admin@example.com",
        password: "Demo456",
        role: "Admin"
    },

    {
        email: "assistant1@example.com",
        password: "Demo789",
        role: "Office Assistant 1"
    },

    {
        email: "assistant2@example.com",
        password: "Demo999",
        role: "Office Assistant 2"
    }
];


document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document.getElementById("email")
            .value
            .trim();


        const password =
            document.getElementById("password")
            .value;


        const user = users.find(
            u =>
                u.email === email &&
                u.password === password
        );


        if (user) {

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(user)
            );


            window.location.href =
                "dashboard.html";

        } else {

            document
                .getElementById("loginMessage")
                .innerText =
                "Invalid Email ID or Password";

        }

    });
