const mysql = require('mysql2');

// Tạo kết nối đến MySQL
const connection = mysql.createConnection({
    host: 'localhost', // Địa chỉ host của MySQL
    user: 'root',      // Tên người dùng MySQL
    password: '123456',      // Mật khẩu MySQL
    database: 'do_an_HTTT' // Tên cơ sở dữ liệu
});

// Kết nối đến MySQL
connection.connect((err) => {
    if (err) {
        console.error('Kết nối MySQL thất bại: ', err);
        return;
    }
    console.log('Kết nối MySQL thành công!');
});

module.exports = connection;