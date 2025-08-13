const SPREADSHEET_ID = '1DE_TXAynRlxuhKKOkHWUsEa3WCrA_UZm2uiBM3GGSSE';

function doGet(e) {
  const action = e.parameter.action;
  
  try {
    switch(action) {
      case 'getKelas':
        return getKelas();
      case 'getSiswa':
        return getSiswa();
      case 'getAbsensi':
        return getAbsensi();
      case 'getNilai':
        return getNilai();
      case 'getJurnal':
        return getJurnal();
      default:
        return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Invalid action'}))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  const action = e.parameter.action;
  let data;
  
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Invalid JSON'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    switch(action) {
      case 'addKelas':
        return addKelas(data);
      case 'addSiswa':
        return addSiswa(data);
      case 'addAbsensi':
        return addAbsensi(data);
      case 'addNilai':
        return addNilai(data);
      case 'addJurnal':
        return addJurnal(data);
      default:
        return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Invalid action'}))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Utility functions
function getSheetData(sheetName) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`Sheet ${sheetName} not found`);
  }
  
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  
  if (lastRow < 2 || lastCol === 0) return []; // No data except header
  
  const data = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}

function addRowToSheet(sheetName, rowData) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`Sheet ${sheetName} not found`);
  }
  
  // Get headers
  const lastCol = sheet.getLastColumn();
  if (lastCol === 0) {
    throw new Error(`Sheet ${sheetName} is empty`);
  }
  
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  
  // Create row array in header order
  const rowArray = headers.map(header => {
    const value = rowData[header];
    return value !== undefined ? value : '';
  });
  
  sheet.appendRow(rowArray);
}

// API Functions
function getKelas() {
  try {
    const data = getSheetData('kelas');
    return ContentService.createTextOutput(JSON.stringify({status: 'success', data: data}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSiswa() {
  try {
    const data = getSheetData('siswa');
    return ContentService.createTextOutput(JSON.stringify({status: 'success', data: data}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getAbsensi() {
  try {
    const data = getSheetData('absensi');
    return ContentService.createTextOutput(JSON.stringify({status: 'success', data: data}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getNilai() {
  try {
    const data = getSheetData('nilai');
    return ContentService.createTextOutput(JSON.stringify({status: 'success', data: data}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getJurnal() {
  try {
    const data = getSheetData('jurnal');
    return ContentService.createTextOutput(JSON.stringify({status: 'success', data: data}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addKelas(data) {
  try {
    addRowToSheet('kelas', data);
    return ContentService.createTextOutput(JSON.stringify({status: 'success', message: 'Kelas berhasil ditambahkan'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addSiswa(data) {
  try {
    addRowToSheet('siswa', data);
    return ContentService.createTextOutput(JSON.stringify({status: 'success', message: 'Siswa berhasil ditambahkan'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addAbsensi(data) {
  try {
    addRowToSheet('absensi', data);
    return ContentService.createTextOutput(JSON.stringify({status: 'success', message: 'Absensi berhasil disimpan'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addNilai(data) {
  try {
    addRowToSheet('nilai', data);
    return ContentService.createTextOutput(JSON.stringify({status: 'success', message: 'Nilai berhasil disimpan'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addJurnal(data) {
  try {
    addRowToSheet('jurnal', data);
    return ContentService.createTextOutput(JSON.stringify({status: 'success', message: 'Jurnal berhasil disimpan'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
