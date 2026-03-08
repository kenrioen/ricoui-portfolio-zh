/**
 * 将 book 目录下的所有 PNG 文件转换为 WebP 格式
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'public', 'assets', 'videos');

async function convertPngToWebp() {
  console.log('🔄 开始将 PNG 图片转换为 WebP 格式...\n');
  console.log(`📁 源目录：${sourceDir}`);
  console.log('─'.repeat(70) + '\n');

  try {
    const files = fs.readdirSync(sourceDir);
    const pngFiles = files.filter(file => file.endsWith('.png'));

    if (pngFiles.length === 0) {
      console.log('✅ 没有发现需要转换的 PNG 文件');
      return;
    }

    console.log(`📸 找到 ${pngFiles.length} 个 PNG 文件\n`);

    let successCount = 0;
    const filesToDelete = [];

    for (const pngFile of pngFiles) {
      const inputPath = path.join(sourceDir, pngFile);
      const webpFile = pngFile.replace('.png', '.webp');
      const outputPath = path.join(sourceDir, webpFile);

      try {
        await sharp(inputPath)
          .webp({ 
            quality: 85,
            effort: 6
          })
          .toFile(outputPath);

        console.log(`✅ ${pngFile} → ${webpFile}`);
        successCount++;
        filesToDelete.push(inputPath);
      } catch (error) {
        console.error(`❌ 转换失败：${pngFile}`);
        console.error(`   错误：${error.message}`);
      }
    }

    // 删除原始 PNG 文件
    console.log('\n' + '─'.repeat(70));
    console.log('🗑️  开始删除原始 PNG 文件...\n');

    for (const filePath of filesToDelete) {
      try {
        fs.unlinkSync(filePath);
        const fileName = path.basename(filePath);
        console.log(`✅ 已删除：${fileName}`);
      } catch (error) {
        console.error(`❌ 删除失败：${path.basename(filePath)}`);
        console.error(`   错误：${error.message}`);
      }
    }

    // 打印统计
    console.log('\n' + '─'.repeat(70));
    console.log('📊 处理统计\n');
    console.log(`原始 PNG 数：${pngFiles.length}`);
    console.log(`成功转换：${successCount}`);
    console.log(`已删除旧文件：${filesToDelete.length}`);
    console.log('\n✨ PNG 转 WebP 完成！\n');
    
    // 显示最终文件列表
    const webpFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith('.webp')).sort();
    console.log('📁 最终 WebP 文件列表：');
    webpFiles.forEach((f, i) => console.log(`   ${i + 1}. ${f}`));
    console.log();

  } catch (error) {
    console.error('\n💥 发生错误:', error);
    process.exit(1);
  }
}

convertPngToWebp();
