/**
 * 补充转换剩余的书籍装帧图片
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'public', 'assets', 'projects', 'book');

// 补充映射
const ADDITIONAL_MAPPING = {
  '演示 1.jpg': 'book-inner-1.webp',
  '演示 2.jpg': 'book-inner-2.webp',
  '演示 3.jpg': 'book-inner-3.webp',
  '演示 4.jpg': 'book-inner-4.webp',
  '演示 5.jpg': 'book-inner-5.webp',
  '演示 6.jpg': 'book-inner-6.webp',
  '目录 2.jpg': 'book-contents-2.webp'
};

async function convertAdditionalImages() {
  console.log('🔄 补充转换剩余书籍装帧图片...\n');

  for (const [original, newName] of Object.entries(ADDITIONAL_MAPPING)) {
    const inputPath = path.join(sourceDir, original);
    const outputPath = path.join(sourceDir, newName);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  文件不存在：${original}`);
      continue;
    }

    try {
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);
      console.log(`✅ ${original} → ${newName}`);
    } catch (error) {
      console.error(`❌ 转换失败：${original}`);
      console.error(`   错误：${error.message}`);
    }
  }

  console.log('\n✨ 补充转换完成！\n');
  
  // 显示最终文件列表
  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.webp')).sort();
  console.log('📁 最终文件列表：');
  files.forEach(f => console.log(`   - ${f}`));
  console.log();
}

convertAdditionalImages();
