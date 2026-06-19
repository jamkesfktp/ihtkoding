import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { FaSave, FaPrint, FaPlus, FaTrash, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import './RtlForm.css';

export default function RtlForm() {
  const { currentUser, userData } = useAuth();
  const [formData, setFormData] = useState({
    nama: '',
    bagian: '',
    kontak: '',
    rows: [
      { kegiatan: '', tujuan: '', klaimType: '', periode: '', tarif: '', perubahan: '', regulasi: '', indikator: '' }
    ]
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from Firebase on mount
  useEffect(() => {
    const loadData = async () => {
      if (!currentUser) return;
      setIsLoading(true);
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists() && docSnap.data().rtl_data) {
          setFormData(docSnap.data().rtl_data);
        } else if (userData) {
          // Pre-fill from userData if available
          setFormData(prev => ({
            ...prev,
            nama: userData.namaLengkap || '',
            bagian: userData.instansi || '',
            kontak: userData.nohp || currentUser.email || ''
          }));
        }
      } catch (err) {
        console.error("Gagal memuat data RTL", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [currentUser, userData]);

  const handleSave = async () => {
    if (!currentUser) return;
    setIsSaving(true);
    setStatus({ type: '', message: '' });
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { rtl_data: formData });
      setStatus({ type: 'success', message: 'Data RTL berhasil disimpan!' });
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Gagal menyimpan data.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const updateHeader = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateRow = (index, field, value) => {
    setFormData(prev => {
      const newRows = [...prev.rows];
      newRows[index] = { ...newRows[index], [field]: value };
      return { ...prev, rows: newRows };
    });
  };

  const addRow = () => {
    setFormData(prev => ({
      ...prev,
      rows: [...prev.rows, { kegiatan: '', tujuan: '', klaimType: '', periode: '', tarif: '', perubahan: '', regulasi: '', indikator: '' }]
    }));
  };

  const removeRow = (index) => {
    if (formData.rows.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      rows: prev.rows.filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <p>Memuat Formulir RTL...</p>
      </div>
    );
  }

  // Generate current date for footer
  const today = new Date();
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const formattedDate = `Yogyakarta, ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;

  return (
    <div className="rtl-container">
      <div className="rtl-card">
        
        {/* ACTION BAR (No Print) */}
        <div className="rtl-header no-print">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <h2 className="rtl-title">Pengisian RTL Koder</h2>
            {status.message && (
              <div className={`rtl-status ${status.type}`}>
                {status.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                {status.message}
              </div>
            )}
          </div>
          <div className="rtl-actions">
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="btn-rtl-save"
            >
              <FaSave /> {isSaving ? 'Menyimpan...' : 'Simpan Draf'}
            </button>
            <button 
              onClick={handlePrint}
              className="btn-rtl-print"
            >
              <FaPrint /> Cetak / PDF
            </button>
          </div>
        </div>

        {/* PRINT AREA */}
        <div className="rtl-content">
          <div className="rtl-doc-title">
            <h1>Rencana Tindak Lanjut (RTL)</h1>
            <h2>Bagi Tenaga Koder dan Calon Koder</h2>
            <h3>Pelatihan Pengkodean Diagnosis Penyakit dan Tindakan Program JKN</h3>
          </div>

          {/* Biodata */}
          <div className="rtl-biodata">
            <table>
              <tbody>
                <tr>
                  <td className="label">Nama</td>
                  <td className="colon">:</td>
                  <td>
                    <input type="text" value={formData.nama} onChange={e => updateHeader('nama', e.target.value)} placeholder="..." />
                  </td>
                </tr>
                <tr>
                  <td className="label">Bagian</td>
                  <td className="colon">:</td>
                  <td>
                    <input type="text" value={formData.bagian} onChange={e => updateHeader('bagian', e.target.value)} placeholder="..." />
                  </td>
                </tr>
                <tr>
                  <td className="label">Nomor HP & email</td>
                  <td className="colon">:</td>
                  <td>
                    <input type="text" value={formData.kontak} onChange={e => updateHeader('kontak', e.target.value)} placeholder="..." />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table */}
          <div className="rtl-table-wrapper">
            <table className="rtl-table">
              <thead>
                <tr>
                  <th className="col-no">No</th>
                  <th>Kegiatan</th>
                  <th>Tujuan</th>
                  <th>Klaim<br/>Rajal/Ranap</th>
                  <th>Periode</th>
                  <th>Tarif<br/>Klaim</th>
                  <th>Perubahan<br/>Tarif Klaim</th>
                  <th>Regulasi<br/>Klaim</th>
                  <th>Indikator<br/>Keberhasilan</th>
                  <th className="col-action no-print"></th>
                </tr>
                <tr style={{ background: 'white', color: '#64748b', fontWeight: 'normal' }}>
                  <td>(1)</td>
                  <td>(2)</td>
                  <td>(3)</td>
                  <td>(4)</td>
                  <td>(5)</td>
                  <td>(6)</td>
                  <td>(7)</td>
                  <td>(8)</td>
                  <td>(9)</td>
                  <td className="no-print"></td>
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="col-no">{idx + 1}.</td>
                    <td><textarea value={row.kegiatan} onChange={e => updateRow(idx, 'kegiatan', e.target.value)} placeholder="Ketikan kegiatan..." /></td>
                    <td><textarea value={row.tujuan} onChange={e => updateRow(idx, 'tujuan', e.target.value)} placeholder="..." /></td>
                    <td><textarea value={row.klaimType} onChange={e => updateRow(idx, 'klaimType', e.target.value)} placeholder="..." /></td>
                    <td><textarea value={row.periode} onChange={e => updateRow(idx, 'periode', e.target.value)} placeholder="..." /></td>
                    <td><textarea value={row.tarif} onChange={e => updateRow(idx, 'tarif', e.target.value)} placeholder="..." /></td>
                    <td><textarea value={row.perubahan} onChange={e => updateRow(idx, 'perubahan', e.target.value)} placeholder="..." /></td>
                    <td><textarea value={row.regulasi} onChange={e => updateRow(idx, 'regulasi', e.target.value)} placeholder="..." /></td>
                    <td><textarea value={row.indikator} onChange={e => updateRow(idx, 'indikator', e.target.value)} placeholder="..." /></td>
                    
                    {/* Delete Button (No Print) */}
                    <td className="col-action no-print">
                      <button 
                        onClick={() => removeRow(idx)}
                        disabled={formData.rows.length <= 1}
                        className="btn-rtl-del"
                        title="Hapus Baris"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Row Button (No Print) */}
          <div className="no-print">
            <button onClick={addRow} className="btn-rtl-add">
              <FaPlus /> Tambah Baris
            </button>
          </div>

          {/* Footer Signature */}
          <div className="rtl-signature">
            <div className="rtl-signature-box">
              <p>{formattedDate}</p>
              <div className="rtl-signature-line"></div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
