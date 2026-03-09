/**
 * 转换 IMG_1191、IMG_1192 和 IMG_1193 为 WebP 格式
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'public', 'assets', 'projects', 'pixel-world');

async function convertSpecificGifs() {
  console.log('🔄 开始转换特定 GIF 文件...\n');
  
  const filesToConvert = ['IMG_1191.GIF', 'IMG_1192.GIF', 'IMG_1193.GIF'];
  
  for (const gifFile of filesToConvert) {
    const inputPath = path.join(sourceDir, gifFile);
    const webpFile = gifFile.replace('.GIF', '.webp').replace('.gif', '.webp');
    const outputPath = path.join(sourceDir, webpFile);
    
    // 检查输入文件是否存在
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  文件不存在：${gifFile}`);
      continue;
    }
    
    // 检查输出文件是否已存在
    if (fs.existsSync(outputPath)) {
      console.log(`⚠️  WebP 文件已存在，跳过：${webpFile}`);
      continue;
    }
    
    try {
      await sharp(inputPath, { 
        animated: true,
        limitInputPixels: false
      })
        .webp({ 
          quality: 85,
          effort: 6
        })
        .toFile(outputPath);
      
      console.log(`✅ ${gifFile} → ${webpFile}`);
    } catch (error) {
      console.error(`❌ 转换失败：${gifFile}`);
      console.error(`   错误：${error.message}`);
    }
  }
  
  console.log('\n✨ 转换完成！\n');
}

convertSpecificGifs();
