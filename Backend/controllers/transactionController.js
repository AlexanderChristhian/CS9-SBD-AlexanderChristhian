const pool = require('../database/pg-database'); // Import the pool module

const createTransaction = async (req, res, next) => {
    try {
        const { item_id, quantity, user_id } = req.body;

        // Check if user_id exists in the users table
        const userCheckQuery = 'SELECT * FROM users WHERE id = $1';
        const userCheckResult = await pool.query(userCheckQuery, [user_id]);

        if (userCheckResult.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist',
                payload: null,
            });
        }

        // Check if item_id exists in the items table
        const itemCheckQuery = 'SELECT * FROM items WHERE id = $1';
        const itemCheckResult = await pool.query(itemCheckQuery, [item_id]);

        if (itemCheckResult.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Item does not exist',
                payload: null,
            });
        }

        // Get the item's price
        const itemPrice = itemCheckResult.rows[0].price;

        // Calculate the total
        const total = itemPrice * quantity;

        const query = 'INSERT INTO transactions (item_id, quantity, user_id, total) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [item_id, quantity, user_id, total];
        const result = await pool.query(query, values);

        if (quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be larger than 0',
                payload: null,
            });
        }

        res.status(201).json({
            success: true,
            message: 'Transaction created',
            payload: result.rows[0],
        });
    } catch (error) {
        next(error);
    }
};

const payTransaction = async (req, res, next) => {
    try {
        // Update the transaction status to 'paid'
        const transactionQuery = 'UPDATE transactions SET status = $1 WHERE id = $2 RETURNING *';
        const transactionResult = await pool.query(transactionQuery, ['paid', req.params.id]);
        const transaction = transactionResult.rows[0];

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found',
                payload: null,
            });
        }

        // Fetch the item and user details
        const itemQuery = 'SELECT * FROM items WHERE id = $1';
        const itemResult = await pool.query(itemQuery, [transaction.item_id]);
        const item = itemResult.rows[0];

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found',
                payload: null,
            });
        }

        const userQuery = 'SELECT * FROM users WHERE id = $1';
        const userResult = await pool.query(userQuery, [transaction.user_id]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                payload: null,
            });
        }

        // Check if the user has enough balance and the item has enough stock
        if (user.balance < transaction.total) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient balance',
                payload: null,
            });
        }

        if (item.stock < transaction.quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock',
                payload: null,
            });
        }

        // Update the item's stock
        const updateStockQuery = 'UPDATE items SET stock = stock - $1 WHERE id = $2';
        await pool.query(updateStockQuery, [transaction.quantity, transaction.item_id]);

        // Update the user's balance
        const updateBalanceQuery = 'UPDATE users SET balance = balance - $1 WHERE id = $2';
        await pool.query(updateBalanceQuery, [transaction.total, transaction.user_id]);

        res.status(200).json({
            success: true,
            message: 'Payment successful',
            payload: transaction,
        });
    } catch (error) {
        next(error);
    }
};

const deleteTransaction = async (req, res, next) => {
    try {
        const result = await pool.query('DELETE FROM transactions WHERE id = $1 RETURNING *', [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found',
                payload: null,
            });
        }

        res.json({
            success: true,
            message: 'Transaction deleted',
            payload: result.rows[0],
        });
    } catch (error) {
        next(error);
    }
};

const getAllTransactions = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM transactions');
        res.json({
            success: true,
            message: 'Transactions retrieved',
            payload: result.rows,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createTransaction, payTransaction, deleteTransaction, getAllTransactions };