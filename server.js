const express = require('express');
const os = require('os');

const app = express();
const port = process.env.PORT || 3000;
const version = process.env.VERSION || '1.0.0';

app.get('/', (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  let ipv4Interfaces = [];
  Object.keys(networkInterfaces).forEach((name) => {
    ipv4Interfaces = ipv4Interfaces.concat(networkInterfaces[name].filter((iface) => iface.family === 'IPv4' && !iface.internal));
  });
  const hostname = os.hostname();
  const ip = ipv4Interfaces.length > 0 ? ipv4Interfaces[0].address : undefined;

  res.json({
    ip,
    hostname,
    version
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
