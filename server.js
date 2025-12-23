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

    if (!firstName) errors.push("First Name is required");
    if (!lastName) errors.push("Last Name is required");
    if (!address) errors.push("Address is required");
    if (!city) errors.push("City is required");
    if (!state) errors.push("State is required");

    if (email && !email.includes("@")) {
        errors.push("Invalid email format");
    }

    if (phone && !/^[0-9+]+$/.test(phone)) {
        errors.push("Invalid phone number");
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
