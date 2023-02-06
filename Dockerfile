FROM node:14-alpine
WORKDIR /usr/src/app
# Install app dependencies
COPY EasyTripGUI/package*.json ./
RUN npm install
COPY ./EasyTripGUI .
EXPOSE 4200
CMD ["npm", "start"]