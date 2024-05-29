const app = require('./app');

app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
