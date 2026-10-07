const fs = require('fs');
const path = require('path');

const signalsPath = path.join(__dirname, '../public/data/signals.json');
const data = JSON.parse(fs.readFileSync(signalsPath, 'utf8'));

// Update each alert to include the new synthetic metrics
data.alerts.forEach(alert => {
  // Generate a random score between 0 and 100 for bandarmologi_score
  alert.metrics.bandarmologi_score = Math.floor(Math.random() * 101);
  // Generate a random score between 0 and 100 for technical_rsi
  alert.metrics.technical_rsi = Math.floor(Math.random() * 101);
});

fs.writeFileSync(signalsPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Mock data updated with synthetic metrics.');
