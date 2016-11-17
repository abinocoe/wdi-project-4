module.exports = {
  db: process.env.MONGODB_URI || 'mongodb://localhost/whatsupp',
  port: process.env.PORT || 3000
};
