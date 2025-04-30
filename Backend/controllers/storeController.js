const pool = require('../database/pg-database'); // Import the pool module

// Get all stores
const getAllStores = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM stores ORDER BY created_at DESC');
    res.json({
      success: true,
      message: 'Stores found',
      payload: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new store
const createStore = async (req, res, next) => {
  try {
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(400).json({
        success: false,
        message: 'Missing store name or address',
        payload: null,
      });
    }

    const result = await pool.query(
      'INSERT INTO stores (name, address) VALUES ($1, $2) RETURNING *',
      [name, address]
    );

    res.status(201).json({
      success: true,
      message: 'Store created',
      payload: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const findId = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM stores WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Store not found',
        payload: null,
      });
    }
    res.json({
      success: true,
      message: 'Store found',
      payload: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

const updateStore = async (req, res, next) => {
  try {
    const { id, name, address, created_at } = req.body;
    
    if (!id || !name || !address) {
      return res.status(400).json({
        success: false,
        message: 'Missing id, name, or address',
        payload: null,
      });
    }

    const checkId = await pool.query('SELECT * FROM stores WHERE id = $1', [id]);
    if (checkId.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Store not found',
        payload: null,
      });
    }

    const result = await pool.query(
      'UPDATE stores SET name = $1, address = $2 WHERE id = $3 RETURNING *',
      [name, address, id]
    );

    res.status(201).json({
      success: true,
      message: 'Store updated',
      payload: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteStore = async (req, res, next) => {
  try {
    const result = await pool.query('DELETE FROM stores WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Store not found',
        data: null,
      });
    }
    res.json({
      success: true,
      message: 'Store deleted',
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllStores, createStore, findId, updateStore, deleteStore };
