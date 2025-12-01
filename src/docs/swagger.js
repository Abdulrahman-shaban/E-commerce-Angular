const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const spec = YAML.load(path.join(__dirname, 'api.yaml'));

module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
};
