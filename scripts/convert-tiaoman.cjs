const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const folderPath = 'C:\\Users\\25709\\Desktop\\ricoui-portfolio-zh\\public\\assets\\projects\\小狸';

async function convertImages() {
  const files = ['条漫1.png', '条漫2.png'];
  
  for (const file of files) {
    const inputPath = path.join(folderPath, file);
    const outputFile = file.replace('.png', '.webp');
    const outputPath = path.join(folderPath, outputFile);

    // 如果文件不存在，跳过
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  文件不存在：${file}`);
      continue;
    }

    // 如果 WebP 已存在，跳过
    if (fs.existsSync(outputPath)) {
      console.log(`⚠️  已存在，跳过：${outputFile}`);
      continue;
    }

    try {
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      console.log(`✅ ${file} → ${outputFile}`);
    } catch (error) {
      console.error(`❌ 转换失败：${file}`);
      console.error(error.message);
    }
  }

  console.log('\n✨ 转换完成！');
}

convertImages();
