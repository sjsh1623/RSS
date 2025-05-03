import fs from 'fs';
import path from 'path';

const outputPath = path.join(__dirname, 'schema.prisma');
const generatorPath = path.join(__dirname, 'generator.prisma');
const modelsPath = path.join(__dirname, 'models');

console.log('📍 outputPath:', outputPath);
console.log('📍 generatorPath:', generatorPath);
console.log('📍 modelsPath:', modelsPath);

const generatorContent = fs.readFileSync(generatorPath, 'utf-8');

const modelFiles = fs
    .readdirSync(modelsPath)
    .filter((file) => file.endsWith('.prisma'))
    .map((file) => fs.readFileSync(path.join(modelsPath, file), 'utf-8'));

const finalSchema = [generatorContent, ...modelFiles].join('\n\n');

console.log('📄 Final schema preview:\n', finalSchema);

try {
  fs.writeFileSync(outputPath, finalSchema);
  console.log('✅ schema.prisma successfully generated.');
} catch (err) {
  console.error('❌ Failed to write schema.prisma:', err);
}