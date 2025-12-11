// /server/src/utils/slugify.js
const slugify = require('slugify');

module.exports = (text) =>
  slugify(text, {
    lower: true,
    strict: true,
    replacement: '-',
    trim: true,
  });
