// scripts/generate_audio.js
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env.local');
let apiKey = process.env.VITE_ELEVENLABS_API_KEY || 'sk_1477a0b0a31e89b834b1e17ca4468c02a6e8bf554f621c5a';

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  for (const line of envFile.split('\n')) {
    if (line.startsWith('VITE_ELEVENLABS_API_KEY=')) {
      const val = line.split('=')[1].trim();
      if (val) apiKey = val;
    }
  }
}

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice
const MODEL_ID = 'eleven_multilingual_v2';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'audio');

// Exact 1:1 narrated strings from PRD §10.4 & TRD §11.3 (Paragraphs & Questions ONLY - Never titles)
const phrases = [
  // Intro
  { id: 'intro', text: "Hello, Explorer! Welcome to the Global Think-Aloud Club! Today, we will discover that a correct answer is only half the job — you must explain why it is correct!", style: 'encouragement' },

  // Wonder
  { id: 'wonder', text: "Sofia says, when you multiply two numbers, the answer is always bigger. Carlos says, not always! Who is right, and how can we prove it? Let's discover how to explain our mathematical thinking!", style: 'thinking' },

  // Story Panels (verbatim 1:1)
  { id: 'story_0', text: "John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki are the Global Think-Aloud Club. They meet online from ten countries to enter the World Math Fair.", style: 'statement' },
  { id: 'story_1', text: "The judge, Whyzo the owl, has one rule. A right answer is not enough. You must explain why it is right!", style: 'emphasis' },
  { id: 'story_2', text: "Mike in New York says, seven plus nine is sixteen, so two odd numbers always add to an even number. Whyzo asks, does one example prove it?", style: 'question' },
  { id: 'story_3', text: "Yuki in Tokyo shows a picture. Each odd number is a pair of dots with one dot left over. Two leftover dots make a new pair, so the total is even!", style: 'statement' },
  { id: 'story_4', text: "Aisha in Mumbai checks her friend's work. Negative three minus negative five equals two, not negative eight. She points to the exact step where the mistake happened.", style: 'statement' },
  { id: 'story_5', text: "Claim, evidence, reason! With these three tools, every explorer can explain their thinking and earn the Golden Logic Trophy!", style: 'emphasis' },

  // Simulation Station Intros
  { id: 'sim_q0', text: "Drag the counters into pairs. Then build your argument with a claim, evidence, and a reason!", style: 'instruction' },
  { id: 'sim_q1', text: "Test some numbers. Is this claim always, sometimes, or never true?", style: 'question' },
  { id: 'sim_q2', text: "Read each step carefully. Can you find the first step where the mistake happens?", style: 'question' },
  { id: 'sim_q3', text: "Use inverse operations on both pans to balance the equation and solve for x!", style: 'instruction' },

  // Practice & Reflect
  { id: 'practice_intro', text: "Welcome to Practice! Travel across 10 landmark worlds, test claims, and prove your reasoning!", style: 'encouragement' },
  { id: 'reflect_intro', text: "What an adventure! Can you explain one claim using evidence and a reason?", style: 'thinking' },
  { id: 'reflect_complete', text: "Lesson complete! You are a Global Think-Aloud Champion!", style: 'celebration' },

  // Sfx / Short feedback
  { id: 'very_good', text: "Convincing! Excellent mathematical reasoning!", style: 'celebration' },
  { id: 'incorrect', text: "Not quite! Check the evidence and see where the claim breaks.", style: 'thinking' }
];

const STYLE_SETTINGS = {
  celebration: { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question: { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis: { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking: { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

async function generateAudio(item) {
  if (!apiKey) {
    console.log(`[SKIP] No VITE_ELEVENLABS_API_KEY found, skipping ${item.id}.mp3 (browser will use Web Speech synthesis fallback)`);
    return;
  }

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      text: item.text,
      model_id: MODEL_ID,
      voice_settings: STYLE_SETTINGS[item.style] || STYLE_SETTINGS.statement
    });

    const options = {
      hostname: 'api.elevenlabs.io',
      port: 443,
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed to generate ${item.id}: HTTP ${res.statusCode}`);
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const filePath = path.join(OUTPUT_DIR, `${item.id}.mp3`);
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        console.log(`Generated: ${item.id}.mp3`);
        resolve();
      });
    });

    req.on('error', (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Starting audio generation pipeline for ${phrases.length} phrases...`);
  for (const item of phrases) {
    try {
      await generateAudio(item);
      await new Promise(r => setTimeout(r, 500)); // rate limit buffer
    } catch (e) {
      console.warn(`Could not generate audio for ${item.id}:`, e.message);
    }
  }

  // Generate src/utils/audioMap.js
  const entries = [];
  for (const p of phrases) {
    entries.push(`  ${JSON.stringify(p.id)}: '/audio/${p.id}.mp3',`);
    if (p.text) {
      entries.push(`  ${JSON.stringify(p.text)}: '/audio/${p.id}.mp3',`);
    }
  }

  const mapCode = `// Auto-generated audio map for Grade 7 Explain Mathematical Thinking
export const audioMap = {
${entries.join('\n')}
};
`;

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'utils', 'audioMap.js'), mapCode, 'utf8');
  console.log('Updated src/utils/audioMap.js');
}

main();
