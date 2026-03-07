/**
 * 批量更新图片引用为 Picture 组件
 * 
 * 使用方法：
 * npm run update:images
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, '..', 'src');

// 要处理的文件扩展名
const extensions = ['.astro', '.mdx', '.md'];

// 统计信息
const stats = {
  filesScanned: 0,
  filesUpdated: 0,
  imagesConverted: 0
};

/**
 * 递归获取所有文件
 */
function getAllFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'build'].includes(entry.name)) {
        getAllFiles(fullPath, files);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * 生成 WebP 路径
 */
function getWebpPath(imgPath) {
  const match = imgPath.match(/\.(png|jpg|jpeg)$/i);
  if (match) {
    return imgPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  }
  return imgPath;
}

/**
 * 处理单个文件
 */
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  let updated = false;

  // 匹配 <img> 标签的正则表达式
  const imgRegex = /<img\s+([^>]*?)\s*\/?>/gi;
  
  content = content.replace(imgRegex, (match, attributes) => {
    // 检查是否已经是 picture 标签内的 img
    // 这里简化处理，只处理明显的独立 img 标签
    
    // 提取 src 属性
    const srcMatch = attributes.match(/src\s*=\s*["']([^"']+)["']/i);
    if (!srcMatch) {
      return match; // 没有 src，跳过
    }

    const src = srcMatch[1];
    
    // 检查是否是外部链接或 SVG
    if (src.startsWith('http') || src.startsWith('data:') || src.endsWith('.svg')) {
      return match; // 跳过外部链接和 SVG
    }

    // 检查是否是 .png, .jpg, .jpeg
    if (!/\.(png|jpg|jpeg)$/i.test(src)) {
      return match; // 不是目标格式，跳过
    }

    // 生成 webp 路径
    const webpSrc = getWebpPath(src);

    // 提取其他属性
    let otherAttrs = attributes.replace(/src\s*=\s*["'][^"']+["']/i, '').trim();
    
    // 构建 picture 标签
    const pictureTag = `<picture>\n              <source type="image/webp" srcset="${webpSrc}" />\n              <img src="${src}" ${otherAttrs} />\n            </picture>`;
    
    stats.imagesConverted++;
    updated = true;
    
    return pictureTag;
  });

  // 如果文件有更新，写入文件
  if (updated) {
    fs.writeFileSync(filePath, content, 'utf-8');
    stats.filesUpdated++;
    console.log(`✅ 更新：${path.relative(srcDir, filePath)}`);
  }

  return updated;
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始批量更新图片引用为 Picture 组件\n');

  // 获取所有文件
  const files = getAllFiles(srcDir);
  stats.filesScanned = files.length;

  console.log(`📁 扫描到 ${files.length} 个文件\n`);

  // 处理每个文件
  for (const file of files) {
    processFile(file);
  }

  // 打印统计信息
  console.log('\n─────────────────────────────────────────────────────────────');
  console.log('📊 更新统计\n');
  console.log(`扫描文件数：${stats.filesScanned}`);
  console.log(`更新文件数：${stats.filesUpdated}`);
  console.log(`转换图片数：${stats.imagesConverted}`);
  console.log('\n✨ 图片引用更新完成！\n');
  
  console.log('💡 提示：请检查更新后的文件，确保所有图片都正确显示。');
  console.log('   某些特殊情况（如动态路径、外部链接等）可能需要手动调整。\n');
}

// 运行脚本
main().catch(error => {
  console.error('💥 发生错误:', error);
  process.exit(1);
});
