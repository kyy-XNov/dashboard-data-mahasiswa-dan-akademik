import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const StudentForm = ({ show, handleClose, addStudent, editStudent, studentToEdit }) => {
  // [PRAKTIKUM 6] State form dengan field baru
  const [formData, setFormData] = useState({
    nim: '', name: '', gender: 'Laki-laki', dob: '', prodi: 'Informatika', ipk: '', status: 'Aktif'
  });

  useEffect(() => {
    if (studentToEdit) {
      setFormData(studentToEdit);
    } else {
      setFormData({ nim: '', name: '', gender: 'Laki-laki', dob: '', prodi: 'Informatika', ipk: '', status: 'Aktif' });
    }
  }, [studentToEdit, show]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentToEdit) {
      editStudent(formData);
    } else {
      addStudent({ ...formData, id: Date.now() });
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="glass-panel border-0 shadow-lg" size="lg">
      <Modal.Header closeButton className="border-0 pb-0 pt-4 px-4">
        <Modal.Title className="fw-bold text-dark fs-4">
          {studentToEdit ? 'Edit Data Mahasiswa' : 'Tambah Mahasiswa'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="px-4 py-3">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold small text-muted">NIM</Form.Label>
                <Form.Control type="text" name="nim" value={formData.nim} onChange={handleChange} required placeholder="20115010" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold small text-muted">Nama Lengkap</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Nama Mahasiswa" />
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold small text-muted">Gender</Form.Label>
                <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold small text-muted">Tanggal Lahir</Form.Label>
                <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold small text-muted">IPK</Form.Label>
                <Form.Control type="number" step="0.01" min="0" max="4" name="ipk" value={formData.ipk} onChange={handleChange} required placeholder="3.50" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold small text-muted">Program Studi (Berdasarkan Fakultas)</Form.Label>
                <Form.Select name="prodi" value={formData.prodi} onChange={handleChange}>
                  {/* [PRAKTIKUM 1] HTML Optgroup untuk mengelompokkan data */}
                  <optgroup label="Fakultas Sains & Teknologi">
                    <option value="Teknologi Informasi">S1 Teknologi Informasi</option>
                    <option value="Arsitektur">S1 Arsitektur</option>
                    <option value="Bioteknologi">S1 Bioteknologi</option>
                  </optgroup>
                  <optgroup label="Fakultas Ilmu Kesehatan">
                    <option value="Radiologi">D3 Radiologi</option>
                    <option value="Teknologi Laboratorium Medis">D4 Teknologi Laboratorium Medis</option>
                    <option value="Keperawatan Anestesiologi">D4 Keperawatan Anestesiologi</option>
                    <option value="Keperawatan">S1 Keperawatan</option>
                    <option value="Kebidanan">D3 Kebidanan</option>
                    <option value="Fisioterapi">S1 Fisioterapi</option>
                    <option value="Ilmu Gizi">S1 Ilmu Gizi</option>
                  </optgroup>
                  <optgroup label="Fakultas Sosial & Humaniora">
                    <option value="Psikologi">S1 Psikologi</option>
                    <option value="Ilmu Komunikasi">S1 Ilmu Komunikasi</option>
                    <option value="Manajemen">S1 Manajemen</option>
                    <option value="Administrasi Publik">S1 Administrasi Publik</option>
                    <option value="Akuntansi">S1 Akuntansi</option>
                  </optgroup>
                   <optgroup label="Fakultas Kedokteran">
                    <option value="Kedokteran">S1 Kedokteran</option>
                  </optgroup>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold small text-muted">Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                  <option value="Lulus">Lulus</option>
                  <option value="Drop Out">Drop Out</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="border-0 px-4 pb-4 pt-0">
          <Button variant="light" className="btn-ios px-4" onClick={handleClose}>Batal</Button>
          <Button variant="primary" type="submit" className="btn-ios px-4 shadow-sm">Simpan Data</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default StudentForm;