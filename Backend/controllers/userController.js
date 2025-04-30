const pool = require('../database/pg-database'); // Import the pool module
const bcrypt = require('bcrypt');

const registerUser = async (req, res, next) => {
    const { email, password, name, balance } = req.query;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format",
            payload: null,
        });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: "Invalid password format",
            payload: null,
        });
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already used",
                payload: null,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 
        
        const result = await pool.query(
            'INSERT INTO users (email, password, name, balance) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, name, balance]
        );
        const user = result.rows[0];
        res.status(201).json({
            success: true,
            message: "User created",
            payload: result.rows[0],
        });
    } catch (error) {
        next(error); // Pass error to centralized error handler
    }
}

const loginUser = async (req, res, next) => {
  const { email, password } = req.query; // or req.body depending on your setup
  
  console.log("Login attempt:", { email, password: "****" });
  
  try {
    // Log the query to find the user
    console.log("Querying database for user with email:", email);
    
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    console.log("Query result rows:", result.rows.length);
    
    if (result.rows.length === 0) {
      console.log("No user found with email:", email);
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        payload: null,
      });
    }

    const user = result.rows[0];
    console.log("User found:", { id: user.id, email: user.email });
    
    // If using bcrypt:
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);
    
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        payload: null,
      });
    }

    res.json({
        success: true,
        message: "Login successful",
        payload: user,
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

const findUser = async (req, res, next) => {
    const email = req.params.email;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                payload: null,
            });
        }
        res.json({
            success: true,
            message: "User found",
            payload: result.rows,
        });
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    const { id, email, password, name, balance } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format",
            payload: null,
        });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: "Invalid password format",
            payload: null,
        });
    }
    
    try {
        const result = await pool.query(
            'UPDATE users SET email = $2, password = $3, name = $4, balance = $5 WHERE id = $1 RETURNING *',
            [id, email, password, name, balance]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                payload: null,
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10); 

        res.json({
            success: true,
            message: "User updated",
            payload: result.rows[0],
        });
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                payload: null,
            });
        }
        res.json({
            success: true,
            message: "User deleted",
            payload: result.rows[0],
        });
    } catch (error) {
        next(error);
    }
}

const topUp = async (req, res, next) => {
    const { id, amount } = req.query;

    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                payload: null,
            });
        }

        const user = result.rows[0];

        if (user.balance == null) {
            const updatedUser = await pool.query(
                'UPDATE users SET balance = $2 WHERE id = $1 RETURNING *',
                [id, amount]
            );
            res.json({
                success: true,
                message: "Top-up successful",
                payload: updatedUser.rows[0],
            });
        }
        else {
            const newBalance = parseInt(user.balance) + parseInt(amount);
            const updatedUser = await pool.query(
                'UPDATE users SET balance = $2 WHERE id = $1 RETURNING *',
                [id, newBalance]
            );
            res.json({
                success: true,
                message: "Top-up successful",
                payload: updatedUser.rows[0],
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { registerUser, loginUser, findUser, updateUser, deleteUser, topUp };