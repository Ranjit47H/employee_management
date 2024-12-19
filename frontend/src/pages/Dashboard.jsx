import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        id: null,
        employee_id: '',
        name: '',
        email: '',
        phone_number: '',
        department: '',
        date_of_joining: '',
        role: ''
    });
    const [editing, setEditing] = useState(false);
    const[error,setError] = useState({});

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleChange = (e) => {
        //const {name,value}=e.target;
        setForm({ ...form, [e.target.name]: e.target.value });
        setError((prevError)=>({
            ...prevError,
            [e.target.name]:undefined,
          }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await axios.put(`http://localhost:5000/api/employees/${form.id}`, form);
            } else {
                await axios.post('http://localhost:5000/api/employees', form);
            }
            fetchEmployees();
            setForm({ id: null, employee_id: '', name: '', email: '', phone_number: '', department: '', date_of_joining: '', role: '' });
            setEditing(false);
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    const handleEdit = (employee) => {
        setForm(employee);
        setEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/employees/${id}`);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
                <input type="text" name="employee_id" value={form.employee_id} onChange={handleChange} placeholder="Employee ID" className="p-2 border" required />
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-2 border" required />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-2 border" required />
                <input type="text" name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone Number" className="p-2 border" required />
                <select name="department" value={form.department} onChange={handleChange} className="p-2 border" required>
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                </select>
                <input type="date" name="date_of_joining" value={form.date_of_joining} max={new Date().toISOString().split("T")[0]} onChange={handleChange} placeholder="Date of Joining" className="p-2 border" required />
                <input type="text" name="role" value={form.role} onChange={handleChange} placeholder="Role" className="p-2 border" required />
                <button type="submit" className="col-span-2 bg-blue-500 text-white p-2">{editing ? 'Update Employee' : 'Add Employee'}</button>
            </form>
            <table className="table-auto w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border p-2">Employee ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Phone Number</th>
                        <th className="border p-2">Department</th>
                        <th className="border p-2">Date of Joining</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td className="border p-2">{employee.employee_id}</td>
                            <td className="border p-2">{employee.name}</td>
                            <td className="border p-2">{employee.email}</td>
                            <td className="border p-2">{employee.phone_number}</td>
                            <td className="border p-2">{employee.department}</td>
                            <td className="border p-2">{employee.date_of_joining}</td>
                            <td className="border p-2">{employee.role}</td>
                            <td className="border p-2">
                                <button onClick={() => handleEdit(employee)} className="bg-yellow-500 text-white px-2 py-1 mr-2">Edit</button>
                                <button onClick={() => handleDelete(employee.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
