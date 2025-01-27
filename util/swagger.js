import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Phones API',
    version: "1.0.0",
    description: 'Phones Docs'
  },
  host: 'localhost:3000',
  basePath: "/api/phones"
};
// host: "surveys-5jvt.onrender.com",

const outputFile = '../phones-swagger-doc.json';
const routes = ['../routes/phones.js'];

swaggerAutogen()(outputFile, routes, doc);