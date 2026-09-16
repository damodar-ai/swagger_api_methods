const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const app = express();
// JSON body read karne ke liye
app.use(express.json());
// Swagger Configuration

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Student API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./server.js"]
};
const swaggerSpec = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
// Temporary Student Data
let students = [
    {
        id: 1,
        name: "Rahul",
        age: 20
    },
    {
        id: 2,
        name: "Aman",
        age: 21
    }
];
// API 1: GET ALL STUDENTS
/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     responses:
 *       200:
 *         description: List of all students
 */
app.get("/students", (req, res) => {

    res.json(students);

});
// API 2: GET STUDENT BY ID
/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 */
app.get("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(
        (student) => student.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }
    res.json(student);
});
// =====================================================
// API 3: CREATE NEW STUDENT


/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ravi"
 *               age:
 *                 type: integer
 *                 example: 22
 *     responses:
 *       201:
 *         description: Student created successfully
 */

app.post("/students", (req, res) => {

    const { name, age } = req.body;

    const newStudent = {
        id: students.length + 1,
        name: name,
        age: age
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });

});


// =====================================================
// API 4: DELETE STUDENT
// =====================================================

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */

app.delete("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(
        (student) => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });

});


// =========================
// Start Server
// =========================

app.listen(3000, () => {

    console.log("Server Running on Port 3000");

});

