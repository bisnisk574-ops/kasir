// Konfigurasi Firebase (Ganti dengan config milik Anda)
const firebaseConfig = { /* isi dari Firebase Console */ };

function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if ((user === 'owner' && pass === 'owner99') || (user === 'admin' && pass === 'admin')) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('app-page').style.display = 'block';
    } else {
        alert('Login Gagal!');
    }
}

function showPage(page) {
    const content = document.getElementById('content');
    if(page === 'transaksi') {
        content.innerHTML = `<h3>Transaksi</h3><input type="text" placeholder="Nama Produk">`;
    } else {
        content.innerHTML = `<h3>History</h3><p>Data kosong...</p>`;
    }
}
