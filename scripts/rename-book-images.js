/**
 * 《献给阿尔吉侬的花束》书籍装帧图片重命名脚本
 * 
 * 功能：
 * 1. 读取 public/assets/projects/book/ 目录下的所有 WebP 文件
 * 2. 按照 Editorial Design 排版需求重命名为规范名称
 * 3. 生成路径反馈报告
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const CONFIG = {
  sourceDir: path.join(__dirname, '..', 'public', 'assets', 'projects', 'book'),
};

// 文件名映射（基于现有图片重新命名）
const FILE_MAPPING = {
  'book-cover.webp': 'cover-1.webp',           // 封面主图
  'book-cover-no-belt.webp': 'cover-2.webp',   // 封面无腰封
  'book-title-page.webp': 'endpaper.webp',     // 扉页/环衬
  'book-contents-1.webp': 'inner-1.webp',      // 内页1 - 目录
  'book-author.webp': 'inner-2.webp',          // 内页2 - 作者页
  'book-hero.webp': 'mockup-1.webp',           // 效果图1
};

async function renameBookImages() {
  console.log('🔄 开始重命名《献给阿尔吉侬的花束》书籍装帧图片...\n');
  console.log(`📁 源目录：${CONFIG.sourceDir}`);
  console.log('─'.repeat(70) + '\n');

  try {
    const files = fs.readdirSync(CONFIG.sourceDir);
    const webpFiles = files.filter(file => file.endsWith('.webp'));

    if (webpFiles.length === 0) {
      console.log('⚠️  未找到需要处理的 WebP 图片文件');
      return;
    }

    console.log(`📸 找到 ${webpFiles.length} 张 WebP 图片\n`);

    let successCount = 0;
    const renamedFiles = [];

    for (const originalFile of webpFiles) {
      const newFileName = FILE_MAPPING[originalFile];
      
      if (!newFileName) {
        console.log(`⚠️  跳过未映射的文件：${originalFile}`);
        continue;
      }

      const inputPath = path.join(CONFIG.sourceDir, originalFile);
      const outputPath = path.join(CONFIG.sourceDir, newFileName);

      try {
        // 如果目标文件已存在，先删除
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }
        
        fs.renameSync(inputPath, outputPath);
        console.log(`✅ ${originalFile} → ${newFileName}`);
        successCount++;
        renamedFiles.push({
          original: originalFile,
          newName: newFileName,
          path: `/assets/projects/book/${newFileName}`
        });
      } catch (error) {
        console.error(`❌ 重命名失败：${originalFile}`);
        console.error(`   错误：${error.message}`);
      }
    }

    // 打印统计
    console.log('\n' + '─'.repeat(70));
    console.log('📊 处理统计\n');
    console.log(`原始图片数：${webpFiles.length}`);
    console.log(`成功重命名：${successCount}`);
    console.log('\n✨ 图片重命名完成！\n');
    
    // 打印路径反馈报告
    console.log('📋 【路径反馈报告】\n');
    console.log('以下是生成好的 .webp 文件的完整名称和相对引用路径：\n');
    
    renamedFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file.newName}`);
      console.log(`   引用路径：${file.path}`);
      console.log();
    });

    // 按类别分组显示
    console.log('─'.repeat(70));
    console.log('📁 按类别分组：\n');
    
    const coverFiles = renamedFiles.filter(f => f.newName.startsWith('cover-'));
    const innerFiles = renamedFiles.filter(f => f.newName.startsWith('inner-'));
    const mockupFiles = renamedFiles.filter(f => f.newName.startsWith('mockup-'));
    const otherFiles = renamedFiles.filter(f => 
      !f.newName.startsWith('cover-') && 
      !f.newName.startsWith('inner-') && 
      !f.newName.startsWith('mockup-')
    );

    if (coverFiles.length > 0) {
      console.log('【封面图】');
      coverFiles.forEach(f => console.log(`  - ${f.newName} → ${f.path}`));
      console.log();
    }

    if (otherFiles.length > 0) {
      console.log('【环衬/特殊图】');
      otherFiles.forEach(f => console.log(`  - ${f.newName} → ${f.path}`));
      console.log();
    }

    if (innerFiles.length > 0) {
      console.log('【内页排版图】');
      innerFiles.forEach(f => console.log(`  - ${f.newName} → ${f.path}`));
      console.log();
    }

    if (mockupFiles.length > 0) {
      console.log('【效果图】');
      mockupFiles.forEach(f => console.log(`  - ${f.newName} → ${f.path}`));
      console.log();
    }

    console.log('─'.repeat(70));
    console.log('\n⚠️ 注意：当前目录中只有 6 张图片，根据你的要求需要 14 张（10 张过程图 + 4 张效果图）。');
    console.log('   请补充剩余的图片文件后，我可以再次处理。\n');

  } catch (error) {
    console.error('\n💥 发生错误:', error);
    process.exit(1);
  }
}

renameBookImages();
