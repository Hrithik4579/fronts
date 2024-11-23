import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Anavbar from './Anavbar';
import { FaTrashAlt, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'; 

const App = () => {
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(null); 
  const [editedStudent, setEditedStudent] = useState({});
  useEffect(() => {
    // Fetch students from the backend
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://backs-vz2y.onrender.com/api/admin/fetchStudents');
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);
  const handleInputChange = (field, value) => {
    setEditedStudent({ ...editedStudent, [field]: value });
  };

  const saveChanges = async (id) => {
    try {
      const response = await axios.put(`https://backs-vz2y.onrender.com/api/admin/makeChanges/${id}`, editedStudent);
      setStudents(students.map(student => (student._id === id ? response.data : student)));
      setEditMode(null);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`https://backs-vz2y.onrender.com/api/admin/deleteStudent/${id}`);
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  return (
    <div className='main123'>
        <Anavbar/>
    <div style={{ padding: '20px' }}>
      <h1 style={{marginLeft: '50px'}}>Students List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Enrollment</th>
            <th>Email</th>
            <th>CGPA</th>
            <th>Graduating Year</th>
            <th>Actions</th>    
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map(student => (
              <tr key={student._id}>
                <td>
                  {editMode === student._id ? (
                    <input
                      type="text"
                      value={editedStudent.enrollmentNumber || ''}
                      onChange={(e) => handleInputChange('enrollmentNumber', e.target.value)}
                    />
                  ) : (
                    student.enrollmentNumber
                  )}
                </td>

                <td>{student.fullName}</td>
                <td> {editMode === student._id ? (
                    <input
                      type="email"
                      value={editedStudent.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    student.email
                  )}
                  </td>
                <td> {editMode === student._id ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editedStudent.cgpa || ''}
                      onChange={(e) => handleInputChange('cgpa', e.target.value)}
                    />
                  ) : (
                    student.cgpa
                  )}
                  </td>
                <td>{student.graduationYear}</td>
                <td>
                  {editMode === student._id ? (
                    <>
                      <button
                        onClick={() => saveChanges(student._id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'green',
                          marginRight: '5px',
                        }}
                        title="Save"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => setEditMode(null)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'red',
                        }}
                        title="Cancel"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditMode(student._id);
                          setEditedStudent(student);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'blue',
                          marginRight: '5px',
                        }}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteStudent(student._id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'red',
                        }}
                        title="Delete"
                      >
                        <FaTrashAlt />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default App;
