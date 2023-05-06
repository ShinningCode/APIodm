FROM node
WORKDIR /APP
COPY . .
RUN npm install
EXPOSE 3000
CMD npm start