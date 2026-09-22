const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

const PORT = 3000;

app.get("/weather", async (req, res) => {

    const city = req.query.city || "Patna";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// WEATHER_API_KEY=df0aa9fbeeaa459bd998c122e76232a7
