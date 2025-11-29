// Simple local log receiver for browser client logs
// Usage: node log-server.js
// The server listens on port 9229 and prints any POSTed JSON body to the terminal.

const http = require('http');
const PORT = process.env.PORT || 9229;

const server = http.createServer((req, res) => {
  // Basic CORS / preflight handling
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === 'POST' && req.url === '/log') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const ts = payload.ts || new Date().toISOString();
        const msg = payload.msg || JSON.stringify(payload);
        console.log(`[CLIENT LOG] ${ts} - ${msg}`);
      } catch (e) {
        console.log('[CLIENT LOG] (raw) ', body);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    });
    return;
  }

  // Simple status page
  if (req.method === 'GET' && (req.url === '/' || req.url === '/status')) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Log server running. POST JSON to /log');
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => console.log(`Log server listening on http://localhost:${PORT}`));
