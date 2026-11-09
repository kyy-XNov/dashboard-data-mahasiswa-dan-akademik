import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import $ from 'jquery';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';

function App() {
  const [students, setStudents] = useState([
    { id: 1, nim: '2011501066', name: 'X', gender: 'Laki-laki', dob: '2099-09-09', prodi: 'Kedokteran', ipk: '3.85', status: 'Cuti' },
    { id: 2, nim: '2011501067', name: 'Y', gender: 'Perempuan', dob: '2077-11-10', prodi: 'Radiologi', ipk: '3.98', status: 'Aktif' },
    { id: 3, nim: '2011501068', name: 'Z', gender: 'Laki-laki', dob: '2066-05-06', prodi: 'Teknologi Informasi', ipk: '3.99', status: 'Aktif' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    $('.widget-card').hide().each(function(index) {
      $(this).delay(100 * index).fadeIn(800);
    });
  }, []);

  const addStudent = (student) => setStudents([...students, student]);
  
  const editStudent = (updatedStudent) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };
  
  const deleteStudent = (id) => {
    if(window.confirm('Hapus data mahasiswa ini?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.nim.includes(searchQuery)
  );

  const totalAktif = students.filter(s => s.status === 'Aktif').length;
  const rataIpk = students.length > 0 
    ? (students.reduce((acc, curr) => acc + Number(curr.ipk), 0) / students.length).toFixed(2) 
    : '0.00';

  return (
    <div className="d-flex flex-column min-vh-100 py-4">
      <main className="flex-grow-1">
        <Container>
          <header className="text-center mb-5 mt-2">
            <h1 className="fw-bold display-5 text-dark mb-1">Dashboard Akademik</h1>
            <p className="text-muted fw-medium">AMATEUR</p>
          </header>

          <Row className="mb-4 g-4">
            <Col md={4} sm={12}>
              <Card className="widget-card border-0 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted fw-semibold mb-1">Total Mahasiswa</h6>
                    <h1 className="fw-bold text-primary mb-0">{students.length}</h1>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                    <i className="bi bi-people-fill fs-2"></i>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md={4} sm={12}>
              <Card className="widget-card border-0 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted fw-semibold mb-1">Mahasiswa Aktif</h6>
                    <h1 className="fw-bold text-success mb-0">{totalAktif}</h1>
                  </div>
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                    <i className="bi bi-person-check-fill fs-2"></i>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md={4} sm={12}>
              <Card className="widget-card border-0 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted fw-semibold mb-1">Rata-rata IPK</h6>
                    <h1 className="fw-bold text-warning mb-0">{rataIpk}</h1>
                  </div>
                  <div className="bg-warning bg-opacity-10 p-3 rounded-circle text-warning">
                    <i className="bi bi-star-fill fs-2"></i>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <div className="glass-panel p-4 p-md-5">
            <div className="d-flex flex-column flex-md-row justify-content-between mb-4 gap-3">
              <InputGroup className="shadow-sm rounded-pill overflow-hidden bg-white bg-opacity-50" style={{ maxWidth: '400px' }}>
                <InputGroup.Text className="bg-transparent border-0 pe-1">
                  <i className="bi bi-search text-muted"></i>
                </InputGroup.Text>
                <Form.Control 
                  placeholder="Cari nama atau NIM..." 
                  className="border-0 bg-transparent shadow-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>

              <Button variant="dark" className="btn-ios shadow" onClick={() => { setStudentToEdit(null); setShowForm(true); }}>
                <i className="bi bi-plus-lg me-2"></i> Tambah Data
              </Button>
            </div>

            <StudentTable 
              students={filteredStudents} 
              deleteStudent={deleteStudent} 
              showEditForm={setStudentToEdit} 
            />
          </div>
          
          <StudentForm
            show={showForm || studentToEdit !== null}
            handleClose={() => { setShowForm(false); setStudentToEdit(null); }}
            addStudent={addStudent}
            editStudent={editStudent}
            studentToEdit={studentToEdit}
          />
        </Container>
      </main>

      <footer className="text-center text-muted mt-5 small fw-medium">
        &copy; 2026 Amateur Admin • Praktikum Fullstack
      </footer>
    </div>
  );
}

export default App;