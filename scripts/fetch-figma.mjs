import fs from 'node:fs';
import path from 'node:path';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (key && !(key in process.env)) {
      process.env[key] = val;
    }
  }
}

loadEnvFile(path.resolve(process.cwd(), '.env.local'));
loadEnvFile(path.resolve(process.cwd(), '.env'));

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_API_KEY;

if (!FIGMA_TOKEN) {
  throw new Error('Figma access token is missing. Please set FIGMA_ACCESS_TOKEN or FIGMA_API_KEY in .env.local or your environment.');
}

export async function getFigmaFile(fileKey, nodeId) {
  const url = nodeId
    ? `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`
    : `https://api.figma.com/v1/files/${fileKey}`;

  const res = await fetch(url, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Figma API error (${res.status}): ${errorText}`);
  }

  return await res.json();
}

export function parseFigmaUrl(url) {
  // e.g. https://www.figma.com/design/:key/:title?node-id=:nodeId
  // or https://www.figma.com/file/:key/:title?node-id=:nodeId
  const match = url.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/);
  if (!match) throw new Error(`Could not parse Figma file key from URL: ${url}`);
  const fileKey = match[1];

  let nodeId = null;
  const nodeMatch = url.match(/[?&]node-id=([^&]+)/);
  if (nodeMatch) {
    nodeId = decodeURIComponent(nodeMatch[1]).replace('-', ':');
  }

  return { fileKey, nodeId };
}
