#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const submissionsPath = path.join(__dirname, 'submissions.json');

function displaySubmissions() {
  try {
    const data = fs.readFileSync(submissionsPath, 'utf-8');
    const submissions = JSON.parse(data);
    
    console.clear();
    console.log(`${colors.bright}${colors.blue}========================================${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}    Hendricks.AI Contact Submissions${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}========================================${colors.reset}\n`);
    
    if (submissions.length === 0) {
      console.log(`${colors.yellow}No submissions yet.${colors.reset}`);
      return;
    }
    
    console.log(`${colors.green}Total submissions: ${submissions.length}${colors.reset}\n`);
    
    submissions.forEach((sub, index) => {
      const date = new Date(sub.timestamp).toLocaleString();
      console.log(`${colors.bright}${colors.magenta}--- Submission #${index + 1} ---${colors.reset}`);
      console.log(`${colors.dim}Date: ${date}${colors.reset}`);
      console.log(`${colors.cyan}Name:${colors.reset} ${sub.firstName} ${sub.lastName}`);
      console.log(`${colors.cyan}Email:${colors.reset} ${sub.email}`);
      console.log(`${colors.cyan}Company:${colors.reset} ${sub.company}`);
      console.log(`${colors.cyan}Phone:${colors.reset} ${sub.phone || 'Not provided'}`);
      console.log(`${colors.cyan}Budget:${colors.reset} ${sub.budget}`);
      console.log(`${colors.cyan}Interests:${colors.reset} ${sub.interests.join(', ') || 'None specified'}`);
      console.log(`${colors.cyan}Message:${colors.reset} ${sub.message || 'No message'}`);
      console.log('');
    });
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`${colors.yellow}No submissions yet. The submissions.json file will be created when someone submits the contact form.${colors.reset}`);
    } else {
      console.error(`${colors.red}Error reading submissions:${colors.reset}`, error.message);
    }
  }
}

// Command line options
const args = process.argv.slice(2);
const command = args[0];

if (command === '--watch' || command === '-w') {
  // Watch mode
  console.log(`${colors.green}Watching for new submissions... (Press Ctrl+C to exit)${colors.reset}\n`);
  
  displaySubmissions();
  
  fs.watchFile(submissionsPath, { interval: 1000 }, () => {
    displaySubmissions();
  });
} else if (command === '--export' || command === '-e') {
  // Export to CSV
  try {
    const data = fs.readFileSync(submissionsPath, 'utf-8');
    const submissions = JSON.parse(data);
    
    const csv = [
      'ID,Timestamp,First Name,Last Name,Email,Company,Phone,Budget,Interests,Message',
      ...submissions.map(s => 
        `"${s.id}","${s.timestamp}","${s.firstName}","${s.lastName}","${s.email}","${s.company}","${s.phone || ''}","${s.budget}","${s.interests.join('; ')}","${s.message || ''}"`
      )
    ].join('\n');
    
    const exportPath = path.join(__dirname, `submissions-export-${Date.now()}.csv`);
    fs.writeFileSync(exportPath, csv);
    console.log(`${colors.green}✓ Exported to: ${exportPath}${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}Error exporting:${colors.reset}`, error.message);
  }
} else if (command === '--clear') {
  // Clear all submissions
  fs.writeFileSync(submissionsPath, '[]');
  console.log(`${colors.yellow}All submissions cleared.${colors.reset}`);
} else {
  // Default: display submissions
  displaySubmissions();
  
  console.log(`${colors.dim}\nOptions:${colors.reset}`);
  console.log(`  ${colors.cyan}--watch, -w${colors.reset}    Watch for new submissions in real-time`);
  console.log(`  ${colors.cyan}--export, -e${colors.reset}   Export submissions to CSV`);
  console.log(`  ${colors.cyan}--clear${colors.reset}        Clear all submissions`);
}