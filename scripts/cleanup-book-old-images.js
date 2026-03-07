/**
 * 清理 book 目录下残留的旧图片文件
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'public', 'assets', 'projects', 'book');

console.log('🔍 扫描目录:', sourceDir);
console.log('─'.repeat(60) + '\n');

try {
  const files = fs.readdirSync(sourceDir);
  const jpgFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

  if (jpgFiles.length === 0) {
    console.log('✅ 没有发现残留的旧图片文件');
  } else {
    console.log(`📸 找到 ${jpgFiles.length} 个需要删除的旧文件\n`);

    for (const file of jpgFiles) {
      const filePath = path.join(sourceDir, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`✅ 已删除：${file}`);
      } catch (error) {
        console.error(`❌ 删除失败：${file}`);
        console.error(`   错误：${error.message}`);
      }
    }

    console.log('\n✨ 清理完成！\n');
  }

} catch (error) {
  console.error('💥 发生错误:', error);
  process.exit(1);
}
