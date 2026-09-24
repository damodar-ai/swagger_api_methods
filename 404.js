const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
app.get("/api/students", (req, res) => {
    res.json({
        success: true,
        students: [
            { id: 1, name: "Rahul" },
            { id: 2, name: "Aman" }
        ]
    });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: "Route not found"
    });
});
/*
app.post("/api/students", (req, res) => {

    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: "Name and age are required"
        });
    }

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        student: {
            name,
            age
        }
    });
});
*/
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
