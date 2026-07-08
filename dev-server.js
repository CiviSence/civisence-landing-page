import http from 'http';
import fs from 'fs';
import path from 'path';
import subscribeHandler from './api/subscribe.js';
import contactHandler from './api/contact.js';
import complianceHandler from './api/compliance.js';
import organizationsHandler from './api/organizations.js';
import registerOrganizationHandler from './api/register-organization.js';

// Parse .env manually
const envPath = path.resolve('.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      const key = parts[0].trim();
      const value = parts.slice(1).join('=').trim();
      process.env[key] = value;
    }
  });
  console.log('✓ Local .env loaded successfully.');
} else {
  console.warn('⚠ .env file not found.');
}

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse URL path without query params
  const urlPath = req.url.split('?')[0];

  let handler = null;
  if (urlPath === '/api/subscribe') handler = subscribeHandler;
  else if (urlPath === '/api/contact') handler = contactHandler;
  else if (urlPath === '/api/compliance') handler = complianceHandler;
  else if (urlPath === '/api/register-organization') handler = registerOrganizationHandler;

  // ── GET routes ──────────────────────────────────────────────────────────────
  if (req.method === 'GET' && urlPath === '/api/organizations') {
    const mockRes = buildMockRes(res);
    await organizationsHandler(req, mockRes);
    return;
  }

  if (req.method === 'POST' && handler) {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        req.body = body ? JSON.parse(body) : {};
        const mockRes = buildMockRes(res);
        await handler(req, mockRes);
      } catch (error) {
        console.error('Handler execution error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

// ── Shared mock response builder ─────────────────────────────────────────────
function buildMockRes(res) {
  let statusCode = 200;
  const headers = {};
  const mockRes = {
    status: (code) => { statusCode = code; return mockRes; },
    json: (data) => {
      res.writeHead(statusCode, { 'Content-Type': 'application/json', ...headers });
      res.end(JSON.stringify(data));
      return mockRes;
    },
    setHeader: (name, value) => { headers[name] = value; return mockRes; },
    end: () => { res.writeHead(statusCode, headers); res.end(); return mockRes; },
  };
  return mockRes;
}

const PORT = 3001;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Local dev API server running at http://127.0.0.1:${PORT}`);
  console.log('   GET  /api/organizations');
  console.log('   POST /api/register-organization');
  console.log('   POST /api/subscribe');
  console.log('   POST /api/contact');
  console.log('   POST /api/compliance');
});
