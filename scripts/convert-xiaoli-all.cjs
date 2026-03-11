const sharp = require('sharp');
const fs = require('fs');

const images = [
  { input: 'C:\\Users\\25709\\Desktop\\ricoui-portfolio-zh\\public\\assets\\projects\\小狸1.png', output: 'C:\\Users\\25709\\Desktop\\ricoui-portfolio-zh\\public\\assets\\projects\\小狸1.webp' },
  { input: 'C:\\Users\\25709\\Desktop\\ricoui-portfolio-zh\\public\\assets\\projects\\小狸2.png', output: 'C:\\Users\\25709\\Desktop\\ricoui-portfolio-zh\\public\\assets\\projects\\小狸2.webp' }
];

async function convert() {
  for (const img of images) {
    try {
      await sharp(img.input)
        .webp({ quality: 85, effort: 6 })
        .toFile(img.output);
      console.log(`✅ 转换成功：${img.input.split('\\').pop()} → ${img.output.split('\\').pop()}`);
    } catch (error) {
      console.error(`❌ 转换失败：${img.input}`, error.message);
    }
  }
}

convert();
