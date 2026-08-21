const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Nhập Model Student (Câu 35)
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Kết nối MongoDB Atlas thành công!"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// API Hello
app.get('/api/hello', (req, res) => {
  res.json({ message: "Backend đang hoạt động!" });
});

// Câu 36: GET /api/students - Lấy danh sách tất cả sinh viên
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Câu 37: POST /api/students - Thêm một sinh viên mới
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Câu 38: PUT /api/students/:id - Cập nhật thông tin sinh viên theo ID
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Câu 39: DELETE /api/students/:id - Xóa sinh viên theo ID
app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa sinh viên thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại port ${PORT}`);
});