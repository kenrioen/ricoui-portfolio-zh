const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const folderPath = 'C:\\Users\\25709\\Desktop\\ricoui-portfolio-zh\\public\\assets\\projects\\小狸';

async function convertImages() {
  const files = fs.readdirSync(folderPath);
  let convertedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    // 只处理非 webp 的图片
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      continue;
    }

    const inputPath = path.join(folderPath, file);
    const outputFile = file.replace(/\.[^.]+$/, '.webp');
    const outputPath = path.join(folderPath, outputFile);

    // 如果 WebP 已存在，跳过
    if (fs.existsSync(outputPath)) {
      console.log(`⚠️  已存在，跳过：${outputFile}`);
      skippedCount++;
      continue;
    }

    try {
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      console.log(`✅ ${file} → ${outputFile}`);
      convertedCount++;
    } catch (error) {
      console.error(`❌ 转换失败：${file}`);
      console.error(error.message);
    }
  }

  console.log('\n✨ 转换完成！');
  console.log(`   成功：${convertedCount} 张`);
  console.log(`   跳过：${skippedCount} 张`);
}

convertImages();
