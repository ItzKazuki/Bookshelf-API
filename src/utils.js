import chalk from "chalk";

export function response(h, message, code ) {
  const res = h.response(message);
  res.code(+code);
  return res;
}

export function validateRequest(data, type) {
  for (const [key, value] of Object.entries(data)) {
    // cek kalo semua data mempunyai value
    if (value === undefined || value.length === 0) return [false, `Gagal ${type == 'create' ? 'menambahkan' : 'memperbarui'} buku. Mohon isi ${key == 'name' ? 'nama' : ''} buku`];
    //cek type data
    if(key === "year" && typeof(value) !== "number") return [false, `Gagal ${type == 'create' ? 'menambahkan' : 'memperbarui'} buku. ${key} harus berupa angka`];
    if(key === "pageCount" && typeof(value) !== "number") return [false, `Gagal ${type == 'create' ? 'menambahkan' : 'memperbarui'} buku. ${key} harus berupa angka`];
    if(key === "readPage" && typeof(value) !== "number") return [false, `Gagal ${type == 'create' ? 'menambahkan' : 'memperbarui'} buku. ${key} harus berupa angka`];
    if(key === "reading" && typeof(value) !== "boolean") return [false, `Gagal ${type == 'create' ? 'menambahkan' : 'memperbarui'} buku. ${key} harus berupa boolean`];
  }

  // cek apakah yang dibaca dan jumlah halaman logis
  if(data.readPage > data.pageCount) return [false, `Gagal ${type == 'create' ? 'menambahkan' : 'memperbarui'} buku. readPage tidak boleh lebih besar dari pageCount`]

  return [true, false]
}

export const error = msg => console.log('\u26D4', chalk.redBright(msg));
export const danger = msg => console.log('\u26a0', chalk.yellowBright(msg));
export const success = msg => console.log('\u2705', chalk.greenBright(msg));