/**
 * 转换美食嘉年华图片为 WebP 格式
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'public', 'assets', 'projects', '单体');

async function convertImagesToWebp() {
  console.log('🔄 开始转换美食嘉年华图片...\n');
  
  const files = fs.readdirSync(sourceDir);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.png' || ext === '.jpg' || ext === '.jpeg';
  });
  
  console.log(`📁 找到 ${imageFiles.length} 张图片\n`);
  
  let convertedCount = 0;
  let skippedCount = 0;
  
  for (const imageFile of imageFiles) {
    const inputPath = path.join(sourceDir, imageFile);
    const webpFile = imageFile.replace(/\.[^.]+$/, '.webp');
    const outputPath = path.join(sourceDir, webpFile);
    
    // 检查输出文件是否已存在
    if (fs.existsSync(outputPath)) {
      console.log(`⚠️  已存在，跳过：${webpFile}`);
      skippedCount++;
      continue;
    }
    
    try {
      await sharp(inputPath)
        .webp({ 
          quality: 85,
          effort: 6
        })
        .toFile(outputPath);
      
      console.log(`✅ ${imageFile} → ${webpFile}`);
      convertedCount++;
    } catch (error) {
      console.error(`❌ 转换失败：${imageFile}`);
      console.error(error.message);
    }
  }
  
  console.log('\n✨ 转换完成！');
  console.log(`   成功：${convertedCount} 张`);
  console.log(`   跳过：${skippedCount} 张`);
}

convertImagesToWebp().catch(console.error);
