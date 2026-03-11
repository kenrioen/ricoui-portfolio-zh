const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:\\Users\\25709\\Desktop\\ricoui-portfolio-zh\\public\\assets\\projects\\小狸.png';
const outputPath = 'C:\\Users\\25709\\Desktop\\ricoui-portfolio-zh\\public\\assets\\projects\\小狸.webp';

async function convert() {
  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    console.log('✅ 转换成功：小狸.png → 小狸.webp');
  } catch (error) {
    console.error('❌ 转换失败：', error.message);
  }
}

convert();
