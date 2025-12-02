const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

try {
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    console.log('--- .env.local content check ---');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=');
        console.log(`Line ${index + 1}: Key="${key.trim()}", ValueLength=${value ? value.trim().length : 0}`);
        if (key.trim() === 'ADMIN_PASSWORD_HASH') {
            console.log(`> FOUND ADMIN_PASSWORD_HASH! Value: ${value.trim()}`);
        }
      }
    });
    console.log('--- End check ---');
  } else {
    console.log('❌ .env.local file NOT FOUND at ' + envPath);
  }
} catch (err) {
  console.error('Error reading file:', err);
}
