import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const allowed = new Set(['index.html', 'styles.css', 'script.js', 'assets', 'Seedance九镜头提示词_项目规划草稿.md']);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mp4': 'video/mp4', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.md': 'text/markdown; charset=utf-8' };

http.createServer((req, res) => {
  let decoded;
  try { decoded = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '') || 'index.html'; }
  catch { res.writeHead(400).end('Bad request'); return; }
  const target = path.resolve(root, decoded);
  if (!target.startsWith(root + path.sep) && target !== root) { res.writeHead(403).end('Forbidden'); return; }
  const relative = path.relative(root, target).split(path.sep);
  if (!allowed.has(relative[0]) || (relative[0] === 'assets' && relative.length < 2)) { res.writeHead(404).end('Not found'); return; }
  fs.stat(target, (err, stat) => {
    if (err || !stat.isFile()) { res.writeHead(404).end('Not found'); return; }
    const headers = { 'Content-Type': types[path.extname(target).toLowerCase()] || 'application/octet-stream', 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store', 'Accept-Ranges': 'bytes' };
    const range = req.headers.range?.match(/^bytes=(\d*)-(\d*)$/);
    if (range) {
      const start = range[1] ? Number(range[1]) : Math.max(0, stat.size - Number(range[2]));
      const end = range[2] && range[1] ? Math.min(Number(range[2]), stat.size - 1) : stat.size - 1;
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= stat.size) {
        res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }).end(); return;
      }
      Object.assign(headers, { 'Content-Length': end - start + 1, 'Content-Range': `bytes ${start}-${end}/${stat.size}` });
      res.writeHead(206, headers);
      if (req.method === 'HEAD') res.end(); else fs.createReadStream(target, { start, end }).pipe(res);
      return;
    }
    headers['Content-Length'] = stat.size;
    res.writeHead(200, headers);
    if (req.method === 'HEAD') res.end(); else fs.createReadStream(target).pipe(res);
  });
}).listen(4173, '127.0.0.1', () => console.log('Local preview: http://127.0.0.1:4173'));
