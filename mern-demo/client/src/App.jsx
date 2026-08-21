import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Lỗi lấy danh sách:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ studentId: '', name: '', email: '' });
        fetchStudents();
      }
    } catch (err) {
      console.error('Lỗi thêm sinh viên:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Quản Lý Sinh Viên</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="MSSV"
          value={formData.studentId}
          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
          required
          style={{ padding: '8px', flex: 1 }}
        />
        <input
          type="text"
          placeholder="Họ và tên"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          style={{ padding: '8px', flex: 1 }}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={{ padding: '8px', flex: 1 }}
        />
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>Thêm Sinh Viên</button>
      </form>

      <h3 style={{ textAlign: 'center' }}>Danh Sách Sinh Viên</h3>
      <ul>
        {students.map((sv) => (
          <li key={sv._id} style={{ marginBottom: '8px' }}>
            <strong>{sv.studentId}</strong> - {sv.name} ({sv.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
