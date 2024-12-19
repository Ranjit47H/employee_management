// const db = require('../config/db'); // Assuming you have a MySQL connection module

// const addEmployee = async (req, res) => {
//     const { employee_id, name, email, phone_number, department, date_of_joining, role } = req.body;
//     if (!employee_id || !name || !email || !phone_number || !department || !date_of_joining || !role) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     try {
//         const [existingEmployee] = await db.execute(
//             'SELECT * FROM employees WHERE employee_id = ? OR email = ?',
//             [employee_id, email]
//         );
//         if (existingEmployee.length > 0) {
//             return res.status(400).json({ error: 'Employee ID or Email already exists' });
//         }

//         await db.execute(
//             'INSERT INTO employees (employee_id, name, email, phone_number, department, date_of_joining, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
//             [employee_id, name, email, phone_number, department, date_of_joining, role]
//         );
//         res.status(201).json({ message: 'Employee added successfully' });
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// // Get all employees
// const getAllEmployees = async (req, res) => {
//     try {
//         const [employees] = await db.execute('SELECT * FROM employees');
//         res.status(200).json(employees);
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// // Update employee details
// const updateEmployee = async (req, res) => {
//     const { id } = req.params;
//     const { name, email, phone_number, department, date_of_joining, role } = req.body;

//     try {
//         const [employee] = await db.execute('SELECT * FROM employees WHERE id = ?', [id]);
//         if (employee.length === 0) {
//             return res.status(404).json({ error: 'Employee not found' });
//         }

//         await db.execute(
//             'UPDATE employees SET name = ?, email = ?, phone_number = ?, department = ?, date_of_joining = ?, role = ? WHERE id = ?',
//             [name, email, phone_number, department, date_of_joining, role, id]
//         );
//         res.status(200).json({ message: 'Employee updated successfully' });
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// // Delete an employee
// const deleteEmployee = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const [employee] = await db.execute('SELECT * FROM employees WHERE id = ?', [id]);
//         if (employee.length === 0) {
//             return res.status(404).json({ error: 'Employee not found' });
//         }

//         await db.execute('DELETE FROM employees WHERE id = ?', [id]);
//         res.status(200).json({ message: 'Employee deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// module.exports = { addEmployee, getAllEmployees, updateEmployee, deleteEmployee };

const db = require('../config/db');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const [employees] = await db.query('SELECT * FROM employees');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch employees', error });
    }
};

// Add a new employee
exports.addEmployee = async (req, res) => {
    const { employee_id, name, email, phone_number, department, date_of_joining, role } = req.body;
    try {
        const query = 'INSERT INTO employees (employee_id, name, email, phone_number, department, date_of_joining, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await db.query(query, [employee_id, name, email, phone_number, department, date_of_joining, role]);
        res.json({ success: true, message: 'Employee added successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error adding employee', error });
    }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { employee_id, name, email, phone_number, department, date_of_joining, role } = req.body;
    try {
        const query = 'UPDATE employees SET employee_id = ?, name = ?, email = ?, phone_number = ?, department = ?, date_of_joining = ?, role = ? WHERE id = ?';
        await db.query(query, [employee_id, name, email, phone_number, department, date_of_joining, role, id]);
        res.json({ success: true, message: 'Employee updated successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error updating employee', error });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM employees WHERE id = ?';
        await db.query(query, [id]);
        res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error deleting employee', error });
    }
};
