const { Server } = require('./src');
const PORT = process.env.PORT || 3000;

Server.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
