const app = require('./app');
const { port } = require('./config/serverConfig');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
