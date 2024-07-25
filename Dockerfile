# Dựa trên Node.js official image
FROM node:20-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy package*.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Xây dựng ứng dụng Next.js
RUN npm run build

# Tạo user không root để chạy ứng dụng
USER node

# Chạy ứng dụng Next.js
CMD ["npm", "start"]

EXPOSE 5000
