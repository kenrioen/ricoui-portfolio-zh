/**
 * 删除原始图片文件（保留 .webp 文件）
 * 
 * 功能：
 * - 删除已有 .webp 版本的 .png、.jpg、.jpeg 文件
 * - 跳过需要保留的文件（如透明背景图片、特殊用途图片）
 * - 显示删除统计信息
 * 
 * 使用方法：
 * node scripts/cleanup-original-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const CONFIG = {
  // 源目录
  sourceDir: path.join(__dirname, '..', 'public', 'assets'),
  // 要删除的原始文件扩展名
  originalExtensions: ['.png', '.jpg', '.jpeg'],
  // 要跳过的目录
  skipDirs: ['.accelerate', 'node_modules', '.git', 'dist', 'build'],
  // 要跳过的文件（保留原始格式的特殊文件）
  skipFiles: [
    // 可以添加需要特殊保留的文件
    // 例如：'logo.png' (如果有特殊用途)
  ]
};

// 统计信息
const stats = {
  totalScanned: 0,
  totalDeleted: 0,
  totalSkipped: 0,
  deletedSize: 0,
  errors: 0
};

/**
 * 格式化文件大小
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * 获取所有原始图片文件
 */
function getAllOriginalFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // 跳过指定目录
      if (!CONFIG.skipDirs.includes(entry.name)) {
        getAllOriginalFiles(fullPath, files);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (CONFIG.originalExtensions.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * 检查是否应该跳过该文件
 */
function shouldSkipFile(filePath) {
  const fileName = path.basename(filePath);
  
  // 检查是否在跳过列表中
  if (CONFIG.skipFiles.some(skip => fileName.includes(skip))) {
    return true;
  }

  // 检查是否有对应的 .webp 文件
  const ext = path.extname(filePath);
  const webpPath = filePath.replace(ext, '.webp');
  
  if (!fs.existsSync(webpPath)) {
    return true; // 没有 webp 版本，保留原文件
  }

  return false;
}

/**
 * 删除单个文件
 */
function deleteFile(filePath) {
  try {
    const fileSize = fs.statSync(filePath).size;
    fs.unlinkSync(filePath);
    
    stats.totalDeleted++;
    stats.deletedSize += fileSize;
    
    const relativePath = path.relative(CONFIG.sourceDir, filePath);
    console.log(`✅ 删除：${relativePath} (${formatBytes(fileSize)})`);
    
    return true;
  } catch (error) {
    stats.errors++;
    console.error(`❌ 删除失败：${path.relative(CONFIG.sourceDir, filePath)}`);
    console.error(`   错误：${error.message}`);
    return false;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🧹 开始清理原始图片文件\n');
  console.log(`📁 源目录：${CONFIG.sourceDir}`);
  console.log(`📋 目标格式：${CONFIG.originalExtensions.join(', ')}`);
  console.log('─'.repeat(60) + '\n');

  // 检查源目录是否存在
  if (!fs.existsSync(CONFIG.sourceDir)) {
    console.error(`❌ 错误：源目录不存在 - ${CONFIG.sourceDir}`);
    process.exit(1);
  }

  // 获取所有原始图片文件
  const originalFiles = getAllOriginalFiles(CONFIG.sourceDir);
  stats.totalScanned = originalFiles.length;

  console.log(`📸 找到 ${originalFiles.length} 张原始图片\n`);

  if (originalFiles.length === 0) {
    console.log('✨ 没有需要清理的文件');
    return;
  }

  // 逐个处理文件
  for (const filePath of originalFiles) {
    if (shouldSkipFile(filePath)) {
      stats.totalSkipped++;
      const relativePath = path.relative(CONFIG.sourceDir, filePath);
      console.log(`⏭️  跳过：${relativePath} (无 WebP 版本或需保留)`);
    } else {
      deleteFile(filePath);
    }
  }

  // 打印统计信息
  console.log('\n' + '─'.repeat(60));
  console.log('📊 清理统计\n');
  console.log(`扫描文件数：${stats.totalScanned}`);
  console.log(`删除文件数：${stats.totalDeleted}`);
  console.log(`跳过文件数：${stats.totalSkipped}`);
  console.log(`错误数：${stats.errors}`);
  console.log('');
  console.log(`释放空间：${formatBytes(stats.deletedSize)}`);
  console.log('\n✨ 原始图片清理完成！\n');
  
  console.log('💡 提示：');
  console.log('   - 所有删除的文件都有对应的 .webp 版本');
  console.log('   - 如果需要恢复，可以从 Git 历史中找回');
  console.log('   - 建议检查网站图片是否正常显示\n');
}

// 运行脚本
main().catch(error => {
  console.error('💥 发生错误:', error);
  process.exit(1);
});
