// import { useState } from "react";
// import axios from 'axios';
// const EmployeeForm=({})=>{
//     const [name, setName] = useState('');
//     const [employee_id, setEmployeeId] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [department, setDepartment] = useState('');
//     const [date_of_joining, setDateOfJoining] = useState('');
//     const [role, setRole] = useState('');
//     const [error, setError] = useState(null);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         if (!name || !employee_id || !email || !phone || !department || !date_of_joining || !role) {
//           onAddEmployeeError('All fields are required.');
//           return;
//         }
    
//         try {
//           const token = localStorage.getItem('token');
//           const response = await axios.post(
//             'http://localhost:5000/employees',
//             { name, employee_id, email, phone, department, date_of_joining, role },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           onAddEmployeeSuccess();
//         } catch (err) {
//           onAddEmployeeError('Error adding employee. Please try again later.');
//           console.error('Error adding employee:', err);
//         }
//       };
//     return (
//         <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
//           <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
//           {error && <div className="text-red-500 mb-4">{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold">Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md"
//               />
//             </div>
//             <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
//               Add Employee
//             </button>
//           </form>
//         </div>
//       );

// }

// export default EmployeeForm;
