const toko = {
  nama: "SG CELL",
  alamat: "Jl. Merdeka No.123",
  telepon: "08123456789",
  logo: "logo.png"
};

let transaksi = [];

function showPage(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if (id === "history") renderHistory();
  if (id === "rekap") renderRekap();
}

function toggleMenu() {
  const menu = document.getElementById("burgerMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

function simpanTransaksi() {
  const produk = document.getElementById("produk").value;
  const harga = parseInt(document.getElementById("harga").value);
  if (!produk || !harga) return alert("Lengkapi data!");
  transaksi.push({ produk, harga, waktu: new Date().toLocaleString() });
  document.getElementById("produk").value = "";
  document.getElementById("harga").value = "";
  alert("Transaksi disimpan");
}

function renderHistory() {
  const list = document.getElementById("listHistory");
  list.innerHTML = "";
  transaksi.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.waktu} - ${t.produk} - Rp${t.harga}`;
    list.appendChild(li);
  });
}

function renderRekap() {
  document.getElementById("totalTransaksi").textContent = transaksi.length;
  const total = transaksi.reduce((a, b) => a + b.harga, 0);
  document.getElementById("totalOmzet").textContent = total;
}

function cetakStruk() {
  const note = document.getElementById("catatan").value;
  const area = document.getElementById("printArea");
  area.innerHTML = `
    <div style="text-align:center">
      <img src="${toko.logo}" width="50"><br>
      <strong>${toko.nama}</strong><br>
      ${toko.alamat}<br>
      HP: ${toko.telepon}<br>
      ---------------------------<br>
      ${transaksi.map(t => `${t.produk} - Rp${t.harga}`).join("<br>")}<br>
      ---------------------------<br>
      Catatan: ${note}<br>
    </div>`;
  area.style.display = "block";
  window.print();
  area.style.display = "none";
}

function shareTxt() {
  const note = document.getElementById("catatan").value;
  let text = `${toko.nama}\n${toko.alamat}\nHP: ${toko.telepon}\n---\n`;
  transaksi.forEach(t => text += `${t.produk} - Rp${t.harga}\n`);
  text += "---\nCatatan: " + note;
  let blob = new Blob([text], { type: "text/plain" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url; a.download = "struk.txt"; a.click();
}

function sharePng() {
  const note = document.getElementById("catatan").value;
  const area = document.getElementById("printArea");
  area.innerHTML = `
    <div style="text-align:center; background:#fff; color:#000; padding:10px;">
      <img src="${toko.logo}" width="50"><br>
      <strong>${toko.nama}</strong><br>
      ${toko.alamat}<br>
      HP: ${toko.telepon}<br>
      ---------------------------<br>
      ${transaksi.map(t => `${t.produk} - Rp${t.harga}`).join("<br>")}<br>
      ---------------------------<br>
      Catatan: ${note}<br>
    </div>`;
  area.style.display = "block";
  html2canvas(area).then(canvas => {
    let link = document.createElement("a");
    link.download = "struk.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    area.style.display = "none";
  });
}