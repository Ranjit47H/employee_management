const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error('Registration Error:', err); 
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email already exists' });
      }
      res.status(500).json({ message: 'Error registering user', error: err.message });
    }
  };
  
  exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Wrong Password' });
      }
  
      const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error('Login Error:', err); 
      res.status(500).json({ message: 'Error logging in', error: err.message });
    }
  };
  exports.deleteAdmin = async (req, res) => {
    const user_id = req.user.id; 
    try {
      await db.query('DELETE FROM employees WHERE user_id = ?', [user_id]);
        await db.query('DELETE FROM users WHERE id = ?', [user_id]);
  
      res.status(200).json({ message: 'Admin account deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting admin account', error: err });
    }
  };
  