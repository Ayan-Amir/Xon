const fs = require('fs');
const path = require('path');

const rootFolderName = process.argv[2];

if (!rootFolderName) {
  console.error('Please provide a folder name.');
  process.exit(0);
}

// Specify the directory where you want to create the custom folder
const srcDir = path.join(__dirname, 'src');

// Create the directory if it doesn't exist
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir);
}

// Create the root folder
const rootFolderPath = path.join(srcDir, rootFolderName);

if (!fs.existsSync(rootFolderPath)) {
  fs.mkdirSync(rootFolderPath);
  console.log(`"${rootFolderName}" folder created in src/`);
} else {
  console.error(`"${rootFolderName}" named folder already exists in src/ directory`);
  process.exit(0);
}

// Create two sub-folder with name 'components' and 'hooks' inside the root folder
const subFolders = ['components', 'hooks'];
subFolders.forEach((subFolderName) => {
  const subFolderPath = path.join(rootFolderPath, subFolderName);
  fs.mkdirSync(subFolderPath);
  
  // Create an 'index.ts' file inside each sub-folder
  fs.writeFileSync(path.join(subFolderPath, 'index.ts'), '');
});

// Create an 'index.ts' file inside the root folder
fs.writeFileSync(path.join(rootFolderPath, 'index.ts'), '');
