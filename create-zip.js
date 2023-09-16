const archiver = require('archiver');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const packageJson = require('./package.json');
const sourceDir = './';
const outputFilePath = `./post-designer-${packageJson.version}.zip`;

const exclusionPatterns = [
  'node_modules/**',
  'src/**',
  '*.md',
  '*.json',
  '.git/**',
  '.DS_Store',
  '*.lock',
  'build/fonts/**',
  'build/images/**',
  '.git',
  '.gitignore',
  '.editorconfig',
  'create-zip.js',
  '*.zip'
];

const files = glob.sync('**', {
  cwd: sourceDir,
  ignore: exclusionPatterns,
  nodir: true,
});

const archive = archiver('zip', { zlib: { level: 9 } });
const output = fs.createWriteStream(outputFilePath);

archive.pipe(output);

for (const file of files) {
  const filePath = path.join(sourceDir, file);
  // Specify 'post-designer' as the destination folder name for all files
  archive.file(filePath, { name: path.join('post-designer', file) });
}

archive.finalize();

archive.on('error', function (err) {
  console.error(err);
});
