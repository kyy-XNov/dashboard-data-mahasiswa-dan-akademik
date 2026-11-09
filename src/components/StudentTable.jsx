import React from 'react';
import { Table, Badge, Button } from 'react-bootstrap';

const StudentTable = ({ students, deleteStudent, showEditForm }) => {
  
  // [PRAKTIKUM 3] Logika JavaScript format tanggal (Tanggal Lahir)
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getIpkColor = (ipk) => {
    if (ipk >= 3.5) return 'success';
    if (ipk >= 3.0) return 'warning';
    return 'danger';
  };

  return (
    <section className="table-responsive">
      <Table hover className="table-glass">
        <thead>
          <tr>
            <th>Mahasiswa</th>
            <th>Program Studi</th>
            <th>Tgl Lahir</th>
            <th>IPK</th>
            <th>Status</th>
            <th className="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted py-5">
                <i className="bi bi-inbox fs-1 d-block mb-3 opacity-50"></i>
                Data tidak ditemukan.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>
                  <div className="d-flex flex-column">
                    <span className="fw-bold text-dark">{student.name}</span>
                    <span className="text-muted small">{student.nim} • {student.gender}</span>
                  </div>
                </td>
                <td className="fw-medium">{student.prodi}</td>
                <td>{formatDate(student.dob)}</td>
                <td>
                  <Badge bg={getIpkColor(Number(student.ipk))} className="px-3 py-2 rounded-pill fs-6 shadow-sm">
                    {Number(student.ipk).toFixed(2)}
                  </Badge>
                </td>
                <td>
                  <span className={`fw-bold small text-${student.status === 'Aktif' ? 'primary' : 'secondary'}`}>
                    • {student.status}
                  </span>
                </td>
                <td className="text-center">
                  {/* Tombol aksi gaya iOS (Bulat) */}
                  <Button variant="light" className="btn-icon-ios me-2 shadow-sm" onClick={() => showEditForm(student)}>
                    <i className="bi bi-pencil text-primary"></i>
                  </Button>
                  <Button variant="light" className="btn-icon-ios shadow-sm" onClick={() => deleteStudent(student.id)}>
                    <i className="bi bi-trash text-danger"></i>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </section>
  );
};

export default StudentTable;