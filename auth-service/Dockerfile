<<<<<<< HEAD
FROM node:20-alpine
=======
<<<<<<< HEAD
FROM node:20
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c

WORKDIR /app

COPY package*.json ./
<<<<<<< HEAD
=======

>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
RUN npm install

COPY . .

EXPOSE 3001

<<<<<<< HEAD
CMD ["npm", "start"]
=======
CMD ["node", "src/index.js"]
=======
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "src/index.js"]

>>>>>>> 57e685cc62836a15e96b86bab455df6805f8ccd6
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
