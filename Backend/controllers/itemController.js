const pool = require('../database/pg-database'); // Import the pool module
const cloudinary = require('cloudinary').v2;

const createItem = async (req, res, next) => {
  try {
    const { name, price, store_id, stock } = req.body;
    const file = req.files?.image; // Access the file from req.files

    if (!file) {
      return res.status(400).json({ 
        succes: false, 
        message: 'File gambar diperlukan atau tidak valid', 
        payload: null 
      });
    }

    // Upload gambar ke Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);

    // Simpan data item ke database
    const query = 'INSERT INTO items (name, price, store_id, image_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, price, store_id, uploadResult.secure_url, stock];
    const result = await pool.query(query, values);

    res.status(201).json({ 
        success: true, 
        message: 'Item created',
        payload: result.rows[0] 
    });
  } catch (error) {
    next(error);
  }
};

const getItems = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.status(200).json({
      success: true,
      message: 'Items found',
      payload: result.rows
    });
  } catch (error) {
    next(error);
  }
};

const getItemById = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
        payload: null
      });
    }
    res.json({
      success: true,
      message: 'Item found',
      payload: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

const getbyStoreId = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM items WHERE store_id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
        payload: null
      });
    }
    res.json({
      success: true,
      message: 'Item found',
      payload: result.rows
    });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { id, name, price, store_id, stock } = req.body;
    const file = req.files?.image; // Access the file from req.files

    if (!file) {
      return res.status(400).json({ 
        succes: false, 
        message: 'File gambar diperlukan atau tidak valid', 
        payload: null 
      });
    }

    // Upload gambar ke Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);

    // Simpan data item ke database
    const query = 'UPDATE items SET name = $1, price = $2, store_id = $3, image_url = $4, stock = $5 WHERE id = $6 RETURNING *';
    const values = [name, price, store_id, uploadResult.secure_url, stock, id];
    const result = await pool.query(query, values);

    res.status(201).json({ 
        success: true, 
        message: 'Item updated',
        payload: result.rows[0] 
    });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
        data: null
      });
    }
    res.json({
      success: true,
      message: 'Item deleted',
      payload: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createItem, getItems, getItemById, getbyStoreId, updateItem, deleteItem };