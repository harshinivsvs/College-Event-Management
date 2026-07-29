const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER USER =================
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const checkSql = "SELECT * FROM users WHERE email = ?";

        db.query(checkSql, [email], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (results.length > 0) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertSql =
                "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

            db.query(
                insertSql,
                [name, email, hashedPassword, role || "student"],
                (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            message: "Registration Failed"
                        });
                    }

                    res.status(201).json({
                        message: "User Registered Successfully"
                    });
                }
            );
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// ================= LOGIN USER =================
const loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length === 0) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        const user = results[0];
        console.log("User from DB:", user);

        console.log("Password entered:", password);
console.log("Hashed password:", user.password);

        console.log("Password entered:", `"${password}"`);
console.log("Stored hash:", user.password);

const isMatch = await bcrypt.compare(password, user.password);

console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign(
    {
        id: user.id,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    }
);

        res.json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    });
};

module.exports = {
    registerUser,
    loginUser
};