const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/register", (req, res) => {
    const {
        company,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state
    } = req.body;

    let errors = [];

    // First Name validation (Required) - Equivalence Partitioning
    if (!firstName || firstName.trim() === "") {
        errors.push("First Name is required");
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
        errors.push("First Name must contain only alphabetic characters");
    } else if (firstName.length > 30) {
        errors.push("First Name must not exceed 30 characters");
    }

    // Last Name validation (Required)
    if (!lastName || lastName.trim() === "") {
        errors.push("Last Name is required");
    }

    // Email validation (Optional) - Equivalence Partitioning
    if (email && email.trim() !== "") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push("Invalid email format");
        }
    }

    // Phone validation (Optional) - Numeric only
    if (phone && phone.trim() !== "") {
        if (!/^[0-9+]+$/.test(phone)) {
            errors.push("Phone must contain only numeric characters");
        }
    }

    // Address validation (Required)
    if (!address || address.trim() === "") {
        errors.push("Address is required");
    }

    // City validation (Required) - Alphabetic only
    if (!city || city.trim() === "") {
        errors.push("City is required");
    } else if (!/^[a-zA-Z\s]+$/.test(city)) {
        errors.push("City must contain only alphabetic characters");
    }

    // State validation (Required) - Must be selected
    if (!state || state.trim() === "") {
        errors.push("State is required");
    }

    if (errors.length > 0) {
        res.status(400).send(`
            <h3>Registration Failed</h3>
            <ul>${errors.map(e => `<li>${e}</li>`).join("")}</ul>
            <a href="/">Go back</a>
        `);
    } else {
        res.send(`
            <h3>Registration Successful</h3>
            <p>Thank you, ${firstName} ${lastName}</p>
            <a href="/">Register another user</a>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
