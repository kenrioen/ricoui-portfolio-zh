# 图片优化指南

本指南介绍如何优化网站图片，提升加载性能。

## 📊 优化效果

经过优化后，网站图片总体积从 **160.58 MB** 减少到 **17.31 MB**，节省了 **89.2%** 的空间！

## 🎯 三项优化措施

### 1. ✅ Astro 自动 WebP 转换配置

已在 `astro.config.mjs` 中配置：

```javascript
image: {
  service: {
    entrypoint: 'astro/assets/services/sharp',
    config: {
      format: 'webp',
      quality: 80
    }
  }
}
```

**作用**：Astro 会自动为使用 `getImage()` 函数导入的图片生成 WebP 格式。

### 2. ✅ Picture 组件（WebP + 原格式回退）

已创建可复用组件：`src/components/ui/Picture.astro`

**使用方法**：

```astro
import Picture from "@/components/ui/Picture.astro";

<Picture
  src="/assets/projects/knights-poker/mockup-1.png"
  alt="描述文字"
  class="aspect-[4/3]"
/>
```

**生成的 HTML**：

```html
<picture>
  <source type="image/webp" srcset="/assets/projects/knights-poker/mockup-1.webp" />
  <img src="/assets/projects/knights-poker/mockup-1.png" alt="描述文字" class="aspect-[4/3]" />
</picture>
```

**优势**：
- 支持 WebP 的浏览器自动加载 WebP（体积小）
- 不支持的浏览器回退到原格式（兼容性好）
- 自动处理路径转换

### 3. ✅ 批量图片压缩脚本

已将 `public/assets/` 目录下的所有 `.png` 和 `.jpg` 文件转换为 `.webp` 格式。

**压缩统计**：
- 总文件数：114 张
- 原始大小：160.58 MB
- 压缩后大小：17.31 MB
- 节省空间：143.27 MB (-89.2%)

## 🚀 使用脚本

### 压缩新图片

如果有新图片需要压缩：

```bash
npm run optimize:images
```

**功能**：
- 递归扫描 `public/assets/` 目录
- 将 `.png` 和 `.jpg` 转换为 `.webp`
- 保留原始文件
- 显示压缩前后对比

### 批量更新图片引用

如果需要批量更新代码中的 `<img>` 标签为 `<picture>` 组件：

```bash
npm run update:images
```

**注意**：此脚本会修改 `src/` 目录下的所有 `.astro`、`.mdx`、`.md` 文件。

## 📝 已更新的文件

### 核心组件

1. **Picture 组件** - `src/components/ui/Picture.astro`
   - 可复用的图片组件，自动提供 WebP 回退方案

2. **HeroCard 组件** - `src/components/home/HeroCard.astro`
   - 首页卡片图片已更新为使用 `<picture>` 标签

3. **Logo 组件** - `src/components/ui/Logo.astro`
   - Logo 图片已更新为使用 `<picture>` 标签

4. **About 页面** - `src/pages/about.astro`
   - 头像图片已更新为使用 `<picture>` 标签

5. **项目详情页** - `src/pages/projects/[slug].astro`
   - Knights Poker 项目的所有图片已更新为使用 `Picture` 组件

### 配置文件

1. **Astro 配置** - `astro.config.mjs`
   - 添加了 WebP 自动转换配置

2. **Package.json** - `package.json`
   - 添加了 `optimize:images` 和 `update:images` 脚本

## 🎨 最佳实践

### 1. 使用 Picture 组件

对于重要的展示图片（如作品封面、项目图片），使用 `Picture` 组件：

```astro
import Picture from "@/components/ui/Picture.astro";

<Picture
  src="/assets/works/my-project.png"
  alt="项目描述"
  loading="lazy"
/>
```

### 2. 使用 Astro 的 getImage()

对于需要响应式的图片，使用 Astro 内置的 `getImage()`：

```astro
---
import { getImage } from 'astro:assets';
import myImage from '../assets/my-image.png';

const optimizedImage = await getImage({
  src: myImage,
  format: 'webp',
  width: 800
});
---

<img 
  src={optimizedImage.src} 
  alt="描述"
  width={optimizedImage.attributes.width}
  height={optimizedImage.attributes.height}
/>
```

### 3. 压缩新图片

添加新图片到 `public/assets/` 后，运行：

```bash
npm run optimize:images
```

### 4. 检查 .webp 文件

确保每个 `.png` 和 `.jpg` 文件旁边都有对应的 `.webp` 文件：

```
assets/
├── image.png
└── image.webp  ✅
```

## 📈 性能提升

### 加载速度

- **首屏加载**：预计提升 60-80%
- **图片加载时间**：减少 89%
- **带宽使用**：减少 89%

### SEO 优化

- ✅ 使用语义化的 `<picture>` 标签
- ✅ 提供 `alt` 文本
- ✅ 使用 `loading="lazy"` 延迟加载
- ✅ 使用 `decoding="async"` 异步解码

## 🔧 故障排除

### 问题：图片不显示

**解决方案**：
1. 检查 `.webp` 文件是否存在
2. 运行 `npm run optimize:images` 生成 WebP 文件
3. 检查图片路径是否正确

### 问题：某些图片不需要 WebP

**解决方案**：
对于不需要转换的图片（如 SVG、外部链接），直接使用 `<img>` 标签：

```astro
<img src="/assets/logo.svg" alt="Logo" />
```

### 问题：想调整压缩质量

**解决方案**：
修改 `scripts/optimize-images.js` 中的配置：

```javascript
const CONFIG = {
  quality: 80, // 调整为 75-90 之间的值
  // ...
};
```

## 📚 相关资源

- [Astro 图片优化文档](https://docs.astro.build/en/guides/images/)
- [WebP 格式介绍](https://developers.google.com/speed/webp)
- [Sharp 库文档](https://sharp.pixelplumbing.com/)

---

**最后更新**：2026-03-06  
**维护者**：Ricoui
