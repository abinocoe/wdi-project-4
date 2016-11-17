module.exports = {
  db: process.env.MONGODB || 'mongodb://localhost/whatsupp',
  port: process.env.PORT || 3000
};
