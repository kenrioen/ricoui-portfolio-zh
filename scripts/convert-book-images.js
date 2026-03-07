/**
 * 献给阿尔吉侬的花束书籍装帧图片批量处理脚本
 * 
 * 功能：
 * 1. 读取 public/assets/projects/book/ 目录下的所有 JPG/PNG 文件
 * 2. 使用 sharp 高质量压缩并转换为 .webp 格式
 * 3. 重命名为英文：book-cover.webp, book-inner-1.webp, book-inner-2.webp 等
 * 4. 删除原始文件
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const CONFIG = {
  sourceDir: path.join(__dirname, '..', 'public', 'assets', 'projects', 'book'),
  webpQuality: 85
};

// 文件名映射（按原文件名的拼音/含义映射为英文）
const FILE_MAPPING = {
  '封面带腰封.jpg': 'book-cover.webp',           // 封面
  '封面不带腰封.jpg': 'book-cover-no-belt.webp',  // 封面不带腰封
  '作者页.jpg': 'book-author.webp',               // 作者页
  '头图.jpg': 'book-hero.webp',                   // 头图
  '扉页.jpg': 'book-title-page.webp',             // 扉页
  '目录.jpg': 'book-contents-1.webp',             // 目录 1
  '目录 2.jpg': 'book-contents-2.webp',           // 目录 2
  '演示 1.jpg': 'book-inner-1.webp',              // 内页 1
  '演示 2.jpg': 'book-inner-2.webp',              // 内页 2
  '演示 3.jpg': 'book-inner-3.webp',              // 内页 3
  '演示 4.jpg': 'book-inner-4.webp',              // 内页 4
  '演示 5.jpg': 'book-inner-5.webp',              // 内页 5
  '演示 6.jpg': 'book-inner-6.webp'               // 内页 6
};

async function processBookImages() {
  console.log('🔄 开始处理《献给阿尔吉侬的花束》书籍装帧图片...\n');
  console.log(`📁 源目录：${CONFIG.sourceDir}`);
  console.log('─'.repeat(60) + '\n');

  try {
    const files = fs.readdirSync(CONFIG.sourceDir);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    if (imageFiles.length === 0) {
      console.log('⚠️  未找到需要处理的图片文件');
      return;
    }

    console.log(`📸 找到 ${imageFiles.length} 张图片\n`);

    let successCount = 0;
    const filesToDelete = [];

    for (const originalFile of imageFiles) {
      const newFileName = FILE_MAPPING[originalFile];
      
      if (!newFileName) {
        console.log(`⚠️  跳过未映射的文件：${originalFile}`);
        continue;
      }

      const inputPath = path.join(CONFIG.sourceDir, originalFile);
      const outputPath = path.join(CONFIG.sourceDir, newFileName);

      try {
        await sharp(inputPath)
          .webp({ 
            quality: CONFIG.webpQuality,
            effort: 6
          })
          .toFile(outputPath);

        console.log(`✅ ${originalFile} → ${newFileName}`);
        successCount++;
        filesToDelete.push(inputPath);
      } catch (error) {
        console.error(`❌ 处理失败：${originalFile}`);
        console.error(`   错误：${error.message}`);
      }
    }

    // 删除原始文件
    console.log('\n' + '─'.repeat(60));
    console.log('🗑️  开始删除原始文件...\n');

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
    console.log('\n' + '─'.repeat(60));
    console.log('📊 处理统计\n');
    console.log(`原始图片数：${imageFiles.length}`);
    console.log(`成功转换：${successCount}`);
    console.log(`已删除旧文件：${filesToDelete.length}`);
    console.log('\n✨ 图片处理完成！\n');
    
    console.log('💡 生成的文件列表：');
    const newFiles = fs.readdirSync(CONFIG.sourceDir).filter(f => f.endsWith('.webp'));
    newFiles.forEach(f => console.log(`   - ${f}`));
    console.log();

  } catch (error) {
    console.error('\n💥 发生错误:', error);
    process.exit(1);
  }
}

processBookImages();
