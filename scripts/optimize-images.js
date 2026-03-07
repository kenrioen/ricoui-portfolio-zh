/**
 * 图片批量压缩与 WebP 转换脚本
 * 使用 Sharp 库将 public/ 目录下的 .png 和 .jpg 文件转换为 .webp 格式
 * 
 * 功能特性：
 * - 递归扫描 public/assets 目录
 * - 自动跳过已存在的 .webp 文件
 * - 保留原始文件结构
 * - 高质量压缩（质量：80）
 * - 显示压缩前后文件大小对比
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// 获取当前文件所在目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const CONFIG = {
  // 源目录（public/assets）
  sourceDir: path.join(__dirname, '..', 'public', 'assets'),
  // 质量设置（0-100，推荐 75-85）
  quality: 80,
  // 要处理的扩展名
  extensions: ['.png', '.jpg', '.jpeg'],
  // 要跳过的目录
  skipDirs: ['.accelerate', 'node_modules', '.git', 'dist', 'build']
};

// 统计信息
const stats = {
  total: 0,
  success: 0,
  failed: 0,
  originalSize: 0,
  optimizedSize: 0,
  skipped: 0
};

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的大小
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * 递归获取所有图片文件
 * @param {string} dir - 目录路径
 * @returns {string[]} 图片文件路径数组
 */
function getAllImageFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // 跳过指定目录
      if (!CONFIG.skipDirs.includes(entry.name)) {
        getAllImageFiles(fullPath, files);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (CONFIG.extensions.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * 压缩并转换单张图片
 * @param {string} inputPath - 输入文件路径
 * @returns {Promise<boolean>} 是否成功
 */
async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const dirName = path.dirname(inputPath);
  const outputPath = path.join(dirName, `${baseName}.webp`);

  try {
    // 检查是否已存在 webp 文件
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  跳过（已存在）: ${path.relative(CONFIG.sourceDir, outputPath)}`);
      stats.skipped++;
      return true;
    }

    // 获取原始文件大小
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;

    // 压缩并转换
    await sharp(inputPath)
      .webp({
        quality: CONFIG.quality,
        effort: 6 // 压缩努力程度（0-6），6 为最高
      })
      .toFile(outputPath);

    // 获取压缩后文件大小
    const optimizedStats = fs.statSync(outputPath);
    const optimizedSize = optimizedStats.size;

    // 计算压缩率
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    // 更新统计
    stats.success++;
    stats.originalSize += originalSize;
    stats.optimizedSize += optimizedSize;

    const relativePath = path.relative(CONFIG.sourceDir, inputPath);
    console.log(`✅ 压缩成功：${relativePath}`);
    console.log(`   📊 ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (-${savings}%)`);

    return true;
  } catch (error) {
    stats.failed++;
    console.error(`❌ 压缩失败：${path.relative(CONFIG.sourceDir, inputPath)}`);
    console.error(`   错误：${error.message}`);
    return false;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始图片批量压缩与 WebP 转换\n');
  console.log(`📁 源目录：${CONFIG.sourceDir}`);
  console.log(`⚙️  质量设置：${CONFIG.quality}`);
  console.log(`📋 支持的格式：${CONFIG.extensions.join(', ')}`);
  console.log('─'.repeat(60) + '\n');

  // 检查源目录是否存在
  if (!fs.existsSync(CONFIG.sourceDir)) {
    console.error(`❌ 错误：源目录不存在 - ${CONFIG.sourceDir}`);
    process.exit(1);
  }

  // 获取所有图片文件
  const imageFiles = getAllImageFiles(CONFIG.sourceDir);
  stats.total = imageFiles.length;

  console.log(`📸 找到 ${imageFiles.length} 张图片待处理\n`);

  if (imageFiles.length === 0) {
    console.log('✨ 没有需要处理的图片');
    return;
  }

  // 逐张处理图片
  for (const [index, filePath] of imageFiles.entries()) {
    const progress = `[${index + 1}/${imageFiles.length}]`;
    console.log(`${progress} 处理中...`);
    await optimizeImage(filePath);
    console.log(''); // 空行分隔
  }

  // 打印统计信息
  console.log('─'.repeat(60));
  console.log('📊 压缩统计\n');
  console.log(`总文件数：${stats.total}`);
  console.log(`成功：${stats.success}`);
  console.log(`失败：${stats.failed}`);
  console.log(`跳过：${stats.skipped}`);
  console.log('');
  console.log(`原始大小：${formatBytes(stats.originalSize)}`);
  console.log(`压缩后大小：${formatBytes(stats.optimizedSize)}`);
  
  if (stats.originalSize > 0) {
    const totalSavings = ((stats.originalSize - stats.optimizedSize) / stats.originalSize * 100).toFixed(1);
    console.log(`节省空间：${formatBytes(stats.originalSize - stats.optimizedSize)} (-${totalSavings}%)`);
  }
  
  console.log('\n✨ 图片压缩完成！\n');
}

// 运行脚本
main().catch(error => {
  console.error('💥 发生错误:', error);
  process.exit(1);
});
