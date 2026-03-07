/**
 * 清理湖南明慧 VI 手册目录下的残留 JPG 文件
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'public', 'assets', 'projects', 'minghui');

console.log('🔍 扫描目录:', sourceDir);
console.log('─'.repeat(60) + '\n');

try {
  const files = fs.readdirSync(sourceDir);
  const jpgFiles = files.filter(file => /\.(jpg|jpeg)$/i.test(file));

  if (jpgFiles.length === 0) {
    console.log('✅ 没有发现残留的 JPG 文件');
  } else {
    console.log(`📸 找到 ${jpgFiles.length} 个需要删除的 JPG 文件\n`);

    let deletedCount = 0;
    for (const file of jpgFiles) {
      const filePath = path.join(sourceDir, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`✅ 已删除：${file}`);
        deletedCount++;
      } catch (error) {
        console.error(`❌ 删除失败：${file}`);
        console.error(`   错误：${error.message}`);
      }
    }

    console.log('\n' + '─'.repeat(60));
    console.log(`✨ 清理完成！共删除 ${deletedCount}/${jpgFiles.length} 个文件\n`);
  }

} catch (error) {
  console.error('💥 发生错误:', error);
  process.exit(1);
}
