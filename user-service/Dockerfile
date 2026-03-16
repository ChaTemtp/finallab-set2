FROM node:20-alpine
<<<<<<< HEAD

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3003

=======
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
EXPOSE 3003
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
CMD ["npm", "start"]