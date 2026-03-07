/**
 * 将湖南明慧封面 PNG 转换为 WebP 格式
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertCoverToWebP() {
  const sourcePath = path.join(__dirname, '..', 'public', 'assets', 'works', '湖南明慧封面.png');
  const outputPath = path.join(__dirname, '..', 'public', 'assets', 'works', '湖南明慧封面.webp');

  console.log('🔄 开始转换湖南明慧封面图片...\n');
  console.log(`📁 源文件：${sourcePath}`);
  console.log(`📁 目标文件：${outputPath}\n`);

  try {
    // 检查源文件是否存在
    if (!fs.existsSync(sourcePath)) {
      console.error('❌ 源文件不存在！');
      process.exit(1);
    }

    // 使用 sharp 转换为 WebP
    await sharp(sourcePath)
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(outputPath);

    console.log('✅ 转换成功！');
    console.log('✨ 湖南明慧封面已转换为 WebP 格式\n');

    // 获取文件大小信息
    const originalStats = fs.statSync(sourcePath);
    const convertedStats = fs.statSync(outputPath);
    
    console.log('📊 文件信息：');
    console.log(`   原始 PNG: ${(originalStats.size / 1024).toFixed(2)} KB`);
    console.log(`   转换后 WebP: ${(convertedStats.size / 1024).toFixed(2)} KB`);
    console.log(`   压缩比：${((1 - convertedStats.size / originalStats.size) * 100).toFixed(1)}%\n`);

  } catch (error) {
    console.error('💥 转换失败:', error);
    process.exit(1);
  }
}

convertCoverToWebP();
