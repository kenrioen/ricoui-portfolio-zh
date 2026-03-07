/**
 * 批量更新所有文件中的图片路径为 .webp
 * 
 * 使用方法：
 * node scripts/convert-all-paths-to-webp.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, '..', 'src');

// 要处理的文件扩展名
const extensions = ['.astro', '.mdx', '.md', '.js', '.ts', '.json'];

// 统计信息
const stats = {
  filesScanned: 0,
  filesUpdated: 0,
  pathsConverted: 0
};

/**
 * 递归获取所有文件
 */
function getAllFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'build', '.astro'].includes(entry.name)) {
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
 * 转换图片路径为 .webp
 */
function convertToWebp(content) {
  let updated = false;
  let count = 0;

  // 匹配图片路径的正则表达式
  // 匹配：/assets/xxx/xxx.png 或 /assets/xxx/xxx.jpg 等
  const pathRegex = /(\/assets\/[^"'\s\)]+?)\.(png|jpg|jpeg)(?=["'\)\s])/gi;

  const newContent = content.replace(pathRegex, (match, p1, p2) => {
    // 跳过视频文件
    if (match.includes('.mp4') || match.includes('.webm')) {
      return match;
    }
    
    // 跳过 SVG
    if (match.includes('.svg')) {
      return match;
    }

    count++;
    updated = true;
    return `${p1}.webp`;
  });

  stats.pathsConverted += count;
  return { content: newContent, updated, count };
}

/**
 * 处理单个文件
 */
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;

    const { content: newContent, updated, count } = convertToWebp(content);

    if (updated) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      stats.filesUpdated++;
      
      if (count > 0) {
        const relativePath = path.relative(srcDir, filePath);
        console.log(`✅ ${relativePath} (${count} 个路径)`);
      }
    }

    stats.filesScanned++;
    return updated;
  } catch (error) {
    console.error(`❌ 处理失败：${filePath}`);
    console.error(`   错误：${error.message}`);
    return false;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🔄 开始批量更新图片路径为 .webp\n');
  console.log(`📁 源目录：${srcDir}`);
  console.log('─'.repeat(60) + '\n');

  // 获取所有文件
  const files = getAllFiles(srcDir);

  console.log(`📄 扫描到 ${files.length} 个文件\n`);

  // 处理每个文件
  for (const file of files) {
    processFile(file);
  }

  // 打印统计信息
  console.log('\n' + '─'.repeat(60));
  console.log('📊 更新统计\n');
  console.log(`扫描文件数：${stats.filesScanned}`);
  console.log(`更新文件数：${stats.filesUpdated}`);
  console.log(`转换路径数：${stats.pathsConverted}`);
  console.log('\n✨ 图片路径更新完成！\n');
  
  console.log('💡 提示：');
  console.log('   - 已将所有 /assets/ 目录下的 .png/.jpg 路径替换为 .webp');
  console.log('   - 跳过了 .mp4, .webm, .svg 文件');
  console.log('   - 请检查网站图片是否正常显示\n');
}

// 运行脚本
main().catch(error => {
  console.error('💥 发生错误:', error);
  process.exit(1);
});
