# 1. Dùng Node.js base image ổn định
FROM node:18

# 2. Tạo thư mục làm việc
WORKDIR /app

# 3. Copy file package để cài dependency
COPY package*.json ./

# 4. Cài đặt các dependency
RUN npm install

# 5. Copy toàn bộ source code vào container
COPY . .

# 6. Expose port nếu có (bỏ qua nếu chỉ chạy script xuất file PDF/Excel mà không mở server)
EXPOSE 3000

# 7. Lệnh khởi chạy (sửa lại tùy tên file chính)
CMD ["node", "app.js"]
