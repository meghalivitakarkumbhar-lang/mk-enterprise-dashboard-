let customers = [];


// LOAD DATA FROM GITHUB

fetch("data/customers.json")
    .then(response => response.json())
    .then(data => {

        customers = data;

        updateDashboard();
        displayCustomers(customers);

    })
    .catch(error => {

        console.error("Data loading error:", error);

    });


// DASHBOARD CALCULATION

function updateDashboard() {

    document.getElementById("totalCustomers").innerText =
        customers.length;


    const completed = customers.filter(
        customer => customer.status === "Completed"
    ).length;

    document.getElementById("completed").innerText =
        completed;


    const pending = customers.filter(
        customer => customer.status === "Pending"
    ).length;

    document.getElementById("pending").innerText =
        pending;


    const totalAmount = customers.reduce(
        (sum, customer) => sum + Number(customer.amount || 0),
        0
    );

    document.getElementById("totalAmount").innerText =
        "₹" + totalAmount.toLocaleString("en-IN");

}


// DISPLAY CUSTOMERS

function displayCustomers(data) {

    const table = document.getElementById("customerTable");

    table.innerHTML = "";


    data.forEach(customer => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${customer.id}</td>

            <td>
                <strong>${customer.name}</strong>
            </td>

            <td>
                <a href="tel:${customer.mobile}">
                    ${customer.mobile}
                </a>
            </td>

            <td>${customer.service}</td>

            <td>
                ₹${Number(customer.amount).toLocaleString("en-IN")}
            </td>

            <td>
                <span class="status ${customer.status}">
                    ${customer.status}
                </span>
            </td>

            <td>${customer.followup}</td>

            <td>${customer.remarks}</td>

        `;

        table.appendChild(row);

    });

}


// SEARCH

document.getElementById("search")
    .addEventListener("input", function () {

        const searchText = this.value.toLowerCase();

        const filtered = customers.filter(customer =>

            customer.name.toLowerCase().includes(searchText) ||

            customer.mobile.includes(searchText)

        );

        displayCustomers(filtered);

    });


// STATUS FILTER

document.getElementById("statusFilter")
    .addEventListener("change", function () {

        const status = this.value;

        if (status === "All") {

            displayCustomers(customers);

        } else {

            const filtered = customers.filter(
                customer => customer.status === status
            );

            displayCustomers(filtered);

        }

    });
