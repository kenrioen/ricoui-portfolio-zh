const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const folderPath = 'C:\\Users\\25709\\Desktop\\ricoui-portfolio-zh\\public\\assets\\projects\\小狸';

async function convertImage() {
  const inputFile = '雪地.png';
  const outputFile = '雪地.webp';
  const inputPath = path.join(folderPath, inputFile);
  const outputPath = path.join(folderPath, outputFile);

  // 如果文件不存在
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  文件不存在：${inputFile}`);
    return;
  }

  // 如果 WebP 已存在，跳过
  if (fs.existsSync(outputPath)) {
    console.log(`⚠️  已存在，跳过：${outputFile}`);
    return;
  }

  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    console.log(`✅ ${inputFile} → ${outputFile}`);
  } catch (error) {
    console.error(`❌ 转换失败：${inputFile}`);
    console.error(error.message);
  }
}

convertImage();
