/**
 * 湖南明慧 VI 手册图片批量压缩和重命名脚本
 * 
 * 功能：
 * 1. 读取 public/assets/projects/minghui/ 目录下的所有 JPG 图片
 * 2. 使用 sharp 高质量压缩并转换为 .webp 格式
 * 3. 重命名为 page-1.webp, page-2.webp... 格式
 * 4. 删除原始 JPG 文件
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const CONFIG = {
  // 源目录
  sourceDir: path.join(__dirname, '..', 'public', 'assets', 'projects', 'minghui'),
  // 输出质量 (1-100)
  quality: 85,
  // WebP 压缩质量 (1-100)
  webpQuality: 80
};

async function processImages() {
  console.log('🔄 开始处理湖南明慧 VI 手册图片...\n');
  console.log(`📁 源目录：${CONFIG.sourceDir}`);
  console.log('─'.repeat(60) + '\n');

  try {
    // 读取目录中的所有文件
    const files = fs.readdirSync(CONFIG.sourceDir);
    
    // 过滤出 JPG 文件，并按名称排序
    const jpgFiles = files
      .filter(file => /\.(jpg|jpeg)$/i.test(file))
      .sort(); // 按字母顺序排序，确保页码顺序正确

    if (jpgFiles.length === 0) {
      console.log('⚠️  未找到需要处理的 JPG 文件');
      return;
    }

    console.log(`📸 找到 ${jpgFiles.length} 张图片\n`);

    // 处理每张图片
    let successCount = 0;
    const deletedFiles = [];

    for (let i = 0; i < jpgFiles.length; i++) {
      const originalFile = jpgFiles[i];
      const pageNumber = i + 1;
      const newFileName = `page-${pageNumber}.webp`;
      
      const inputPath = path.join(CONFIG.sourceDir, originalFile);
      const outputPath = path.join(CONFIG.sourceDir, newFileName);

      try {
        // 使用 sharp 压缩并转换为 WebP
        await sharp(inputPath)
          .webp({ 
            quality: CONFIG.webpQuality,
            effort: 6 // 压缩努力程度 (0-6)，6 为最高质量
          })
          .toFile(outputPath);

        console.log(`✅ ${originalFile} → ${newFileName}`);
        successCount++;
        
        // 将原文件加入删除列表
        deletedFiles.push(inputPath);
      } catch (error) {
        console.error(`❌ 处理失败：${originalFile}`);
        console.error(`   错误：${error.message}`);
      }
    }

    // 删除原始文件
    console.log('\n' + '─'.repeat(60));
    console.log('🗑️  开始删除原始文件...\n');

    for (const filePath of deletedFiles) {
      try {
        fs.unlinkSync(filePath);
        const fileName = path.basename(filePath);
        console.log(`✅ 已删除：${fileName}`);
      } catch (error) {
        console.error(`❌ 删除失败：${path.basename(filePath)}`);
        console.error(`   错误：${error.message}`);
      }
    }

    // 打印统计信息
    console.log('\n' + '─'.repeat(60));
    console.log('📊 处理统计\n');
    console.log(`原始图片数：${jpgFiles.length}`);
    console.log(`成功转换：${successCount}`);
    console.log(`已删除旧文件：${deletedFiles.length}`);
    console.log('\n✨ 图片处理完成！\n');
    
    console.log('💡 提示：');
    console.log('   - 所有图片已转换为 WebP 格式');
    console.log('   - 文件名已统一为 page-1.webp, page-2.webp... 格式');
    console.log('   - 原始 JPG 文件已安全删除\n');

  } catch (error) {
    console.error('\n💥 发生错误:', error);
    process.exit(1);
  }
}

// 运行脚本
processImages();
