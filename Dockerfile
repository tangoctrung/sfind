# Dựa trên Node.js official image
FROM node:20-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy package*.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN yarn install --network-timeout 1000000

# Copy toàn bộ source code vào container
COPY . .

# Xây dựng ứng dụng Next.js
RUN yarn build

EXPOSE 3100

# Chạy ứng dụng Next.js
CMD ["yarn", "start"]
