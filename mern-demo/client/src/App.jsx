import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  // Câu 59 & 63: Tải danh sách sinh viên từ API
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

  // Xử lý Thêm (POST) hoặc Cập nhật (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Câu 61: API PUT cập nhật sinh viên
        const res = await fetch(`/api/students/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          setEditingId(null);
          setFormData({ studentId: '', name: '', email: '' });
          fetchStudents();
        }
      } else {
        // Câu 60: API POST thêm sinh viên
        const res = await fetch('/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          setFormData({ studentId: '', name: '', email: '' });
          fetchStudents();
        }
      }
    } catch (err) {
      console.error('Lỗi xử lý dữ liệu:', err);
    }
  };

  // Chọn sinh viên để sửa
  const handleEdit = (sv) => {
    setEditingId(sv._id);
    setFormData({ studentId: sv.studentId, name: sv.name, email: sv.email });
  };

  // Câu 62: API DELETE xóa sinh viên
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchStudents();
      }
    } catch (err) {
      console.error('Lỗi xóa sinh viên:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '700px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Quản Lý Sinh Viên (MERN Stack)</h2>

      {/* Form nhập dữ liệu */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="MSSV"
          value={formData.studentId}
          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
          required
          style={{ padding: '8px', flex: '1 1 120px' }}
        />
        <input
          type="text"
          placeholder="Họ và tên"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          style={{ padding: '8px', flex: '1 1 180px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={{ padding: '8px', flex: '1 1 180px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: editingId ? '#2196F3' : '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
          {editingId ? 'Cập Nhật' : 'Thêm Sinh Viên'}
        </button>
      </form>

      {/* Danh sách sinh viên */}
      <h3 style={{ textAlign: 'center' }}>Danh Sách Sinh Viên</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {students.map((sv) => (
          <li key={sv._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
            <span><strong>{sv.studentId}</strong> - {sv.name} ({sv.email})</span>
            <div>
              <button onClick={() => handleEdit(sv)} style={{ marginRight: '5px', padding: '5px 10px', cursor: 'pointer' }}>Sửa</button>
              <button onClick={() => handleDelete(sv._id)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
