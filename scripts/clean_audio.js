// scripts/clean_audio.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio');
const MAP_PATH = path.join(__dirname, '..', 'src', 'utils', 'audioMap.js');

async function main() {
  if (!fs.existsSync(AUDIO_DIR) || !fs.existsSync(MAP_PATH)) {
    console.log('Audio directory or audioMap.js not found.');
    return;
  }

  const mapContent = fs.readFileSync(MAP_PATH, 'utf8');
  const referencedFiles = new Set(
    [...mapContent.matchAll(/\/audio\/([a-zA-Z0-9_\-]+\.mp3)/g)].map(m => m[1])
  );

  const existingFiles = fs.readdirSync(AUDIO_DIR);
  let removedCount = 0;

  for (const file of existingFiles) {
    if (file.endsWith('.mp3') && !referencedFiles.has(file)) {
      fs.unlinkSync(path.join(AUDIO_DIR, file));
      console.log(`Deleted orphaned audio file: ${file}`);
      removedCount++;
    }
  }

  console.log(`Audio cleanup complete. Removed ${removedCount} orphaned files.`);
}

main();
