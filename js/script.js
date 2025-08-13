// Konfigurasi API
const API_URL = 'https://script.google.com/macros/s/AKfycbyXfUVOQ2jFalREVHd-EGu0UxNGzQmM79LQyLuTDB_Jx2JiPPUhAz7NGzQ9LS6Y-eJo/exec'; // Ganti dengan URL Google Apps Script Anda

// Data dummy untuk demo
const dummyData = {
    kelas: [
        { id: 1, nama_kelas: 'XII RPL 1', jumlah_siswa: 24, tahun_ajaran: '2023/2024' },
        { id: 2, nama_kelas: 'XII RPL 2', jumlah_siswa: 22, tahun_ajaran: '2023/2024' }
    ],
    siswa: [
        { id: 1, nis: '12345', nama: 'Budi Santoso', kelas: 'XII RPL 1' },
        { id: 2, nis: '12346', nama: 'Ani Putri', kelas: 'XII RPL 1' },
        { id: 3, nis: '12347', nama: 'Candra Wijaya', kelas: 'XII RPL 2' }
    ],
    absensi: [
        { id: 1, nis: '12345', nama: 'Budi Santoso', status: 'Hadir' },
        { id: 2, nis: '12346', nama: 'Ani Putri', status: 'Tidak Hadir' },
        { id: 3, nis: '12347', nama: 'Candra Wijaya', status: 'Hadir' }
    ],
    nilai: [
        { id: 1, nis: '12345', nama: 'Budi Santoso', uh1: 85, uh2: 90, uh3: 88, rata_rata: 87.67 },
        { id: 2, nis: '12346', nama: 'Ani Putri', uh1: 92, uh2: 89, uh3: 95, rata_rata: 92.00 }
    ],
    jurnal: [
        {
            id: 1,
            tanggal: '2023-10-16',
            materi: 'Pengenalan Algoritma dan Pseudocode',
            kegiatan: 'Penjelasan konsep dasar algoritma, contoh algoritma sederhana, dan latihan membuat pseudocode untuk kasus sederhana.',
            kendala: 'Beberapa siswa masih kesulitan memahami konsep algoritma secara abstrak.',
            solusi: 'Memberikan contoh konkret dan visualisasi menggunakan flowchart.'
        },
        {
            id: 2,
            tanggal: '2023-10-17',
            materi: 'Struktur Data Dasar (Array dan List)',
            kegiatan: 'Penjelasan perbedaan array dan list, implementasi dalam bahasa pemrograman Python, latihan praktik.',
            kendala: 'Siswa bingung dengan indeks array dimulai dari 0.',
            solusi: 'Memberikan analogi kehidupan sehari-hari dan banyak contoh praktis.'
        }
    ]
};

// Fungsi untuk mengambil data dari API
async function fetchData(action) {
    try {
        // Untuk demo, gunakan data dummy
        // Dalam implementasi nyata, uncomment baris berikut:
        // const response = await fetch(`${API_URL}?action=${action}`);
        // return await response.json();
        
        // Return data dummy untuk demo
        return dummyData[action] || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Fungsi untuk menyimpan data ke API
async function saveData(action, data) {
    try {
        // Untuk demo, tampilkan alert
        // Dalam implementasi nyata, uncomment baris berikut:
        /*
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
        return await response.json();
        */
        
        // Simulasi berhasil menyimpan
        alert(`Data berhasil disimpan ke ${action}!`);
        return { status: 'success' };
    } catch (error) {
        console.error('Error saving data:', error);
        return { status: 'error' };
    }
}

// Fungsi untuk memuat data kelas
async function loadKelas() {
    const data = await fetchData('kelas');
    const tbody = document.querySelector('#kelasTable tbody');
    tbody.innerHTML = '';
    
    data.forEach((kelas, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${kelas.nama_kelas}</td>
                <td>${kelas.jumlah_siswa}</td>
                <td>${kelas.tahun_ajaran}</td>
                <td class="action-buttons">
                    <button class="btn btn-icon btn-secondary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon btn-warning"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    
    // Update dropdown kelas
    updateKelasDropdown();
}

// Fungsi untuk memuat data siswa
async function loadSiswa() {
    const data = await fetchData('siswa');
    const tbody = document.querySelector('#siswaTable tbody');
    tbody.innerHTML = '';
    
    data.forEach((siswa, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${siswa.nis}</td>
                <td>${siswa.nama}</td>
                <td>${siswa.kelas}</td>
                <td class="action-buttons">
                    <button class="btn btn-icon btn-secondary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon btn-warning"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    
    // Update dropdown siswa di form nilai
    updateSiswaDropdown();
}

// Fungsi untuk memuat data absensi
async function loadAbsensi() {
    const data = await fetchData('absensi');
    const tbody = document.querySelector('#absensiTable tbody');
    tbody.innerHTML = '';
    
    data.forEach((absen, index) => {
        const statusClass = absen.status === 'Hadir' ? 'status-hadir' : 'status-absen';
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${absen.nis}</td>
                <td>${absen.nama}</td>
                <td><span class="status-badge ${statusClass}">${absen.status}</span></td>
                <td class="action-buttons">
                    <button class="btn btn-icon btn-success"><i class="fas fa-check"></i></button>
                    <button class="btn btn-icon btn-warning"><i class="fas fa-times"></i></button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Fungsi untuk memuat data nilai
async function loadNilai() {
    const data = await fetchData('nilai');
    const tbody = document.querySelector('#nilaiTable tbody');
    tbody.innerHTML = '';
    
    data.forEach((nilai, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${nilai.nis}</td>
                <td>${nilai.nama}</td>
                <td>${nilai.uh1}</td>
                <td>${nilai.uh2}</td>
                <td>${nilai.uh3}</td>
                <td>${nilai.rata_rata}</td>
                <td class="action-buttons">
                    <button class="btn btn-icon btn-secondary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon btn-warning"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Fungsi untuk memuat data jurnal
async function loadJurnal() {
    const data = await fetchData('jurnal');
    const container = document.getElementById('jurnalList');
    container.innerHTML = '';
    
    data.forEach(jurnal => {
        const date = new Date(jurnal.tanggal).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const entry = `
            <div class="jurnal-entry">
                <div class="jurnal-date">${date}</div>
                <div class="jurnal-content">
                    <p><strong>Materi:</strong> ${jurnal.materi}</p>
                    <p><strong>Kegiatan:</strong> ${jurnal.kegiatan}</p>
                    <p><strong>Kendala:</strong> ${jurnal.kendala || '-'}</p>
                    <p><strong>Solusi:</strong> ${jurnal.solusi || '-'}</p>
                </div>
            </div>
        `;
        container.innerHTML += entry;
    });
}

// Fungsi untuk mengupdate dropdown kelas
function updateKelasDropdown() {
    const select = document.getElementById('kelasSiswa');
    select.innerHTML = '<option value="">Pilih Kelas</option>';
    
    dummyData.kelas.forEach(kelas => {
        const option = document.createElement('option');
        option.value = kelas.nama_kelas;
        option.textContent = kelas.nama_kelas;
        select.appendChild(option);
    });
}

// Fungsi untuk mengupdate dropdown siswa
function updateSiswaDropdown() {
    const select = document.getElementById('siswaNilai');
    select.innerHTML = '<option value="">Pilih Siswa</option>';
    
    dummyData.siswa.forEach(siswa => {
        const option = document.createElement('option');
        option.value = siswa.id;
        option.textContent = `${siswa.nis} - ${siswa.nama}`;
        select.appendChild(option);
    });
}

// Fungsi untuk menangani upload file
function handleFileUpload(file) {
    // Simulasi proses upload
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const previewTable = document.getElementById('previewTable');
    const previewData = document.getElementById('previewData').querySelector('tbody');
    
    // Tampilkan progress bar
    progressContainer.style.display = 'block';
    previewTable.style.display = 'none';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Sembunyikan progress bar
            progressContainer.style.display = 'none';
            
            // Tampilkan tabel preview dengan data dummy
            previewTable.style.display = 'block';
            previewData.innerHTML = '';
            
            // Tambahkan data dummy untuk preview
            const dummyUploadData = [
                ['12345', 'Budi Santoso', 'XII RPL 1'],
                ['12346', 'Ani Putri', 'XII RPL 1'],
                ['12347', 'Candra Wijaya', 'XII RPL 2'],
                ['12348', 'Dewi Lestari', 'XII RPL 2'],
                ['12349', 'Eko Prasetyo', 'XII RPL 1']
            ];
            
            dummyUploadData.forEach(row => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                previewData.appendChild(tr);
            });
        }
        progressBar.style.width = progress + '%';
        progressText.textContent = progress + '%';
    }, 200);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    document.querySelectorAll('.tab-link').forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            document.querySelectorAll('.tab-link').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked tab
            button.classList.add('active');
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected tab content
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
    
    // Event listener untuk form kelas
    document.getElementById('kelasForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const kelasData = {
            id: Date.now(),
            nama_kelas: document.getElementById('namaKelas').value,
            tahun_ajaran: document.getElementById('tahunAjaran').value,
            jumlah_siswa: 0
        };
        
        const result = await saveData('addKelas', kelasData);
        if (result.status === 'success') {
            loadKelas();
            this.reset();
        }
    });
    
    // Event listener untuk form siswa
    document.getElementById('siswaForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const siswaData = {
            id: Date.now(),
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
    
    // Event listener untuk form nilai
    document.getElementById('nilaiForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const uh1 = parseFloat(document.getElementById('uh1').value);
        const uh2 = parseFloat(document.getElementById('uh2').value);
        const uh3 = parseFloat(document.getElementById('uh3').value);
        const rataRata = ((uh1 + uh2 + uh3) / 3).toFixed(2);
        
        const nilaiData = {
            id: Date.now(),
            siswa_id: document.getElementById('siswaNilai').value,
            uh1: uh1,
            uh2: uh2,
            uh3: uh3,
            rata_rata: rataRata
        };
        
        const result = await saveData('addNilai', nilaiData);
        if (result.status === 'success') {
            loadNilai();
            this.reset();
        }
    });
    
    // Event listener untuk form jurnal
    document.getElementById('jurnalForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const jurnalData = {
            id: Date.now(),
            tanggal: document.getElementById('tanggalJurnal').value,
            materi: document.getElementById('materiJurnal').value,
            kegiatan: document.getElementById('kegiatanJurnal').value,
            kendala: document.getElementById('kendalaJurnal').value,
            solusi: document.getElementById('solusiJurnal').value
        };
        
        const result = await saveData('addJurnal', jurnalData);
        if (result.status === 'success') {
            loadJurnal();
            this.reset();
        }
    });
    
    // Event listener untuk tombol "Hadir Semua"
    document.getElementById('hadirSemuaBtn').addEventListener('click', function() {
        alert('Semua siswa telah ditandai hadir!');
    });
    
    // Event listener untuk tombol download absensi
    document.getElementById('downloadAbsensiBtn').addEventListener('click', function() {
        alert('Rekap data akan diunduh dalam format Excel.');
    });
    
    // Event listener untuk tombol upload
    document.getElementById('uploadBtn').addEventListener('click', function() {
        document.getElementById('uploadModal').style.display = 'flex';
    });
    
    // Event listener untuk tombol close modal
    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('uploadModal').style.display = 'none';
    });
    
    // Event listener untuk file input
    document.getElementById('fileInput').addEventListener('change', function() {
        if (this.files.length > 0) {
            handleFileUpload(this.files[0]);
        }
    });
    
    // Drag and drop functionality
    const dropArea = document.getElementById('dropArea');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropArea.style.backgroundColor = 'rgba(167, 199, 231, 0.3)';
        dropArea.style.borderColor = 'var(--accent)';
    }
    
    function unhighlight() {
        dropArea.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        dropArea.style.borderColor = 'var(--primary)';
    }
    
    dropArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    }
    
    // Event listener untuk tombol simpan data upload
    document.getElementById('saveDataBtn').addEventListener('click', function() {
        alert('Data siswa berhasil diupload dan disimpan!');
        document.getElementById('uploadModal').style.display = 'none';
        loadSiswa();
    });
});