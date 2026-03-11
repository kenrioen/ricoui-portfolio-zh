const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\25709\\Desktop\\ricoui-portfolio-zh\\public\\assets\\projects\\x';

async function convertImagesToWebp(dir) {
  console.log(`🔄 开始转换 ${dir} 中的图片...\n`);

  const files = fs.readdirSync(dir);
  let convertedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // 如果是文件夹，递归处理
    if (stat.isDirectory()) {
      console.log(`📁 进入文件夹: ${file}`);
      const subResult = await convertImagesToWebp(filePath);
      convertedCount += subResult.converted;
      skippedCount += subResult.skipped;
      continue;
    }

    // 检查是否是图片文件
    const ext = path.extname(file).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      continue;
    }

    const webpFile = file.replace(/\.[^.]+$/, '.webp');
    const outputPath = path.join(dir, webpFile);

    // 如果 WebP 已存在，跳过
    if (fs.existsSync(outputPath)) {
      console.log(`⚠️  已存在，跳过：${path.join(path.basename(dir), webpFile)}`);
      skippedCount++;
      continue;
    }

    try {
      await sharp(filePath)
        .webp({
          quality: 85,
          effort: 6
        })
        .toFile(outputPath);

      console.log(`✅ ${file} → ${webpFile}`);
      convertedCount++;
    } catch (error) {
      console.error(`❌ 转换失败：${file}`);
      console.error(error.message);
    }
  }

  return { converted: convertedCount, skipped: skippedCount };
}

async function main() {
  const result = await convertImagesToWebp(sourceDir);

  console.log('\n✨ 转换完成！');
  console.log(`   成功：${result.converted} 张`);
  console.log(`   跳过：${result.skipped} 张`);
}

main().catch(console.error);
