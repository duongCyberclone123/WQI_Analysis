# 1. Base image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy toàn bộ mã nguồn vào image
COPY . .

# 6. Expose port (thay đổi nếu app chạy port khác)
EXPOSE 3000

# 7. Command để chạy app
CMD ["npm", "start"]
