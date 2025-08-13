// ⚠️ GANTI DENGAN WEB APP URL ANDA DARI GOOGLE APPS SCRIPT
const API_URL = 'https://script.google.com/macros/s/AKfycbyXfUVOQ2jFalREVHd-EGu0UxNGzQmM79LQyLuTDB_Jx2JiPPUhAz7NGzQ9LS6Y-eJo/exec';

// Utility functions
function showLoading() {
    document.body.style.cursor = 'wait';
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);
}

function hideLoading() {
    document.body.style.cursor = 'default';
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = false);
}

function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// API Functions
async function fetchData(action) {
    try {
        showLoading();
        const response = await fetch(`${API_URL}?action=${action}`);
        const result = await response.json();
        
        if (result.status === 'success') {
            hideLoading();
            return result.data || [];
        } else {
            throw new Error(result.message || 'Gagal mengambil data');
        }
    } catch (error) {
        hideLoading();
        console.error('API Error:', error);
        alert(`Error: ${error.message}`);
        return [];
    }
}

async function saveData(action, data) {
    try {
        showLoading();
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: action,
                ...data
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            hideLoading();
            alert(result.message || 'Data berhasil disimpan!');
            return result;
        } else {
            throw new Error(result.message || 'Gagal menyimpan data');
        }
    } catch (error) {
        hideLoading();
        console.error('Save Error:', error);
        alert(`Error: ${error.message}`);
        return { status: 'error', message: error.message };
    }
}

// Data Loading Functions
async function loadKelas() {
    const data = await fetchData('getKelas');
    const tbody = document.querySelector('#kelasTable tbody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Tidak ada data kelas</td></tr>';
        return;
    }
    
    data.forEach((kelas, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${kelas.nama_kelas || '-'}</td>
                <td>${kelas.jumlah_siswa || '0'}</td>
                <td>${kelas.tahun_ajaran || '-'}</td>
                <td class="action-buttons">
                    <button class="btn btn-icon btn-secondary" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon btn-warning" title="Hapus"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function loadSiswa() {
    const data = await fetchData('getSiswa');
    const tbody = document.querySelector('#siswaTable tbody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Tidak ada data siswa</td></tr>';
        return;
    }
    
    data.forEach((siswa, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${siswa.nis || '-'}</td>
                <td>${siswa.nama || '-'}</td>
                <td>${siswa.kelas || '-'}</td>
                <td class="action-buttons">
                    <button class="btn btn-icon btn-secondary" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon btn-warning" title="Hapus"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function loadAbsensi() {
    const data = await fetchData('getAbsensi');
    const tbody = document.querySelector('#absensiTable tbody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Tidak ada data absensi</td></tr>';
        return;
    }
    
    data.forEach((absen, index) => {
        const statusClass = absen.status === 'Hadir' ? 'status-hadir' : 'status-absen';
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${absen.siswa_id || '-'}</td>
                <td>${absen.nama_siswa || '-'}</td>
                <td><span class="status-badge ${statusClass}">${absen.status || '-'}</span></td>
                <td class="action-buttons">
                    <button class="btn btn-icon btn-success" title="Hadir"><i class="fas fa-check"></i></button>
                    <button class="btn btn-icon btn-warning" title="Tidak Hadir"><i class="fas fa-times"></i></button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function loadNilai() {
    const data = await fetchData('getNilai');
    const tbody = document.querySelector('#nilaiTable tbody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">Tidak ada data nilai</td></tr>';
        return;
    }
    
    data.forEach((nilai, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${nilai.siswa_id || '-'}</td>
                <td>${nilai.nama_siswa || '-'}</td>
                <td>${nilai.uh1 || '0'}</td>
                <td>${nilai.uh2 || '0'}</td>
                <td>${nilai.uh3 || '0'}</td>
                <td>${nilai.rata_rata || '0'}</td>
                <td class="action-buttons">
                    <button class="btn btn-icon btn-secondary" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon btn-warning" title="Hapus"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function loadJurnal() {
    const data = await fetchData('getJurnal');
    const container = document.getElementById('jurnalList');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (data.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">Tidak ada data jurnal</p>';
        return;
    }
    
    data.forEach(jurnal => {
        const date = formatDate(jurnal.tanggal);
        
        const entry = `
            <div class="jurnal-entry">
                <div class="jurnal-date">${date}</div>
                <div class="jurnal-content">
                    <p><strong>Materi:</strong> ${jurnal.materi || '-'}</p>
                    <p><strong>Kegiatan:</strong> ${jurnal.kegiatan || '-'}</p>
                    <p><strong>Kendala:</strong> ${jurnal.kendala || '-'}</p>
                    <p><strong>Solusi:</strong> ${jurnal.solusi || '-'}</p>
                </div>
            </div>
        `;
        container.innerHTML += entry;
    });
}

// Dropdown Update Functions
async function updateKelasDropdown() {
    const data = await fetchData('getKelas');
    const select = document.getElementById('kelasSiswa');
    
    if (!select) return;
    
    select.innerHTML = '<option value="">Pilih Kelas</option>';
    
    data.forEach(kelas => {
        const option = document.createElement('option');
        option.value = kelas.nama_kelas;
        option.textContent = kelas.nama_kelas;
        select.appendChild(option);
    });
}

async function updateSiswaDropdown() {
    const data = await fetchData('getSiswa');
    const select = document.getElementById('siswaNilai');
    
    if (!select) return;
    
    select.innerHTML = '<option value="">Pilih Siswa</option>';
    
    data.forEach(siswa => {
        const option = document.createElement('option');
        option.value = siswa.id;
        option.textContent = `${siswa.nis} - ${siswa.nama}`;
        select.appendChild(option);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    document.querySelectorAll('.tab-link').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-link').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Load initial data
    loadKelas();
    loadSiswa();
    loadAbsensi();
    loadNilai();
    loadJurnal();
    updateKelasDropdown();
    updateSiswaDropdown();
    
    // Form event listeners
    const kelasForm = document.getElementById('kelasForm');
    if (kelasForm) {
        kelasForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const kelasData = {
                id: Date.now().toString(),
                nama_kelas: document.getElementById('namaKelas').value,
                tahun_ajaran: document.getElementById('tahunAjaran').value,
                jumlah_siswa: '0'
            };
            
            const result = await saveData('addKelas', kelasData);
            if (result.status === 'success') {
                loadKelas();
                updateKelasDropdown();
                this.reset();
            }
        });
    }
    
    const siswaForm = document.getElementById('siswaForm');
    if (siswaForm) {
        siswaForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const siswaData = {
                id: Date.now().toString(),
                nis: document.getElementById('nis').value,
                nama: document.getElementById('namaSiswa').value,
                kelas: document.getElementById('kelasSiswa').value
            };
            
            const result = await saveData('addSiswa', siswaData);
            if (result.status === 'success') {
                loadSiswa();
                this.reset();
            }
        });
    }
    
    const nilaiForm = document.getElementById('nilaiForm');
    if (nilaiForm) {
        nilaiForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const uh1 = parseFloat(document.getElementById('uh1').value) || 0;
            const uh2 = parseFloat(document.getElementById('uh2').value) || 0;
            const uh3 = parseFloat(document.getElementById('uh3').value) || 0;
            const rataRata = ((uh1 + uh2 + uh3) / 3).toFixed(2);
            
            const nilaiData = {
                id: Date.now().toString(),
                siswa_id: document.getElementById('siswaNilai').value,
                uh1: uh1.toString(),
                uh2: uh2.toString(),
                uh3: uh3.toString(),
                rata_rata: rataRata.toString()
            };
            
            const result = await saveData('addNilai', nilaiData);
            if (result.status === 'success') {
                loadNilai();
                this.reset();
            }
        });
    }
    
    const jurnalForm = document.getElementById('jurnalForm');
    if (jurnalForm) {
        jurnalForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const jurnalData = {
                id: Date.now().toString(),
                tanggal: document.getElementById('tanggalJurnal').value,
                materi: document.getElementById('materiJurnal').value,
                kegiatan: document.getElementById('kegiatanJurnal').value,
                kendala: document.getElementById('kendalaJurnal').value || '',
                solusi: document.getElementById('solusiJurnal').value || ''
            };
            
            const result = await saveData('addJurnal', jurnalData);
            if (result.status === 'success') {
                loadJurnal();
                this.reset();
            }
        });
    }
    
    // Button event listeners
    const hadirSemuaBtn = document.getElementById('hadirSemuaBtn');
    if (hadirSemuaBtn) {
        hadirSemuaBtn.addEventListener('click', function() {
            alert('Fitur "Hadir Semua" akan ditandai di database');
        });
    }
    
    const downloadAbsensiBtn = document.getElementById('downloadAbsensiBtn');
    if (downloadAbsensiBtn) {
        downloadAbsensiBtn.addEventListener('click', function() {
            alert('Rekap absensi akan diunduh dalam format Excel');
        });
    }
    
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            alert('Fitur upload akan mengirim data ke database');
        });
    }
});
