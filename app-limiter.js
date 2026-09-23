const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

const apiLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 5
});

app.get(
    "/api/student",
    apiLimiter,
    (req, res) => {

        res.json({
            name: "Rahul",
            age: 20,
            course: "Python"
        });

    }
);

app.listen(3002, () => {

    console.log(
        "Server running on port 3002"
    );

});
