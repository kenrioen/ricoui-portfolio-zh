/**
 * 将 pixel-world 目录下的 GIF 文件转换为 WebP 格式
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'public', 'assets', 'projects', 'pixel-world');

async function convertGifToWebp() {
  console.log('🔄 开始将 GIF 图片转换为 WebP 格式...\n');
  console.log(`📁 源目录：${sourceDir}`);
  console.log('─'.repeat(70) + '\n');

  try {
    const files = fs.readdirSync(sourceDir);
    const gifFiles = files.filter(file => file.toLowerCase().endsWith('.gif'));

    if (gifFiles.length === 0) {
      console.log('✅ 没有发现需要转换的 GIF 文件');
      return;
    }

    console.log(`🎬 找到 ${gifFiles.length} 个 GIF 文件\n`);
    console.log('文件列表:');
    gifFiles.forEach(f => console.log(`  - ${f}`));
    console.log();

    let successCount = 0;

    for (const gifFile of gifFiles) {
      const inputPath = path.join(sourceDir, gifFile);
      const webpFile = gifFile.replace('.gif', '.webp');
      const outputPath = path.join(sourceDir, webpFile);

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
        successCount++;
      } catch (error) {
        console.error(`❌ 转换失败：${gifFile}`);
        console.error(`   错误：${error.message}`);
      }
    }

    // 打印统计
    console.log('\n' + '─'.repeat(70));
    console.log('📊 处理统计\n');
    console.log(`原始 GIF 数：${gifFiles.length}`);
    console.log(`成功转换：${successCount}`);
    console.log('\n✨ GIF 转 WebP 完成！\n');
    
    // 显示最终文件列表
    const webpFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith('.webp')).sort();
    console.log('📁 新增的 WebP 文件：');
    webpFiles.forEach((f, i) => console.log(`   ${i + 1}. ${f}`));
    console.log();

  } catch (error) {
    console.error('\n💥 发生错误:', error);
    process.exit(1);
  }
}

convertGifToWebp();
