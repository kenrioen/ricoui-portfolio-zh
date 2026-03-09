# 像素世界项目图片放置指南

## 📁 需要放置的图片文件

### 1. 作品集封面和头图（放在 `public/assets/works/` 目录下）

| 文件名 | 尺寸建议 | 说明 |
|--------|---------|------|
| `pixel-world-cover.webp` | 800x600px | 作品集卡片封面图 |
| `pixel-world-hero.webp` | 1920x1080px | 作品集详情页头图（宽屏） |

### 2. 11 张像素插画作品（放在 `public/assets/projects/pixel-world/` 目录下）

| 文件名 | 尺寸建议 | 说明 |
|--------|---------|------|
| `pixel-01.webp` | 800x800px | 像素插画作品 01 |
| `pixel-02.webp` | 800x800px | 像素插画作品 02 |
| `pixel-03.webp` | 800x800px | 像素插画作品 03 |
| `pixel-04.webp` | 800x800px | 像素插画作品 04 |
| `pixel-05.webp` | 800x800px | 像素插画作品 05 |
| `pixel-06.webp` | 800x800px | 像素插画作品 06 |
| `pixel-07.webp` | 800x800px | 像素插画作品 07 |
| `pixel-08.webp` | 800x800px | 像素插画作品 08 |
| `pixel-09.webp` | 800x800px | 像素插画作品 09 |
| `pixel-10.webp` | 800x800px | 像素插画作品 10 |
| `pixel-11.webp` | 800x800px | 像素插画作品 11 |

## 📂 完整路径示例

```
public/
├── assets/
│   ├── works/
│   │   ├── pixel-world-cover.webp    ← 封面图
│   │   └── pixel-world-hero.webp     ← 头图
│   └── projects/
│       └── pixel-world/
│           ├── pixel-01.webp         ← 作品 1
│           ├── pixel-02.webp         ← 作品 2
│           ├── pixel-03.webp         ← 作品 3
│           ├── pixel-04.webp         ← 作品 4
│           ├── pixel-05.webp         ← 作品 5
│           ├── pixel-06.webp         ← 作品 6
│           ├── pixel-07.webp         ← 作品 7
│           ├── pixel-08.webp         ← 作品 8
│           ├── pixel-09.webp         ← 作品 9
│           ├── pixel-10.webp         ← 作品 10
│           └── pixel-11.webp         ← 作品 11
```

## 🎨 图片格式要求

- **格式**：WebP（推荐）或 PNG
- **质量**：85% 以上
- **色彩模式**：sRGB
- **文件大小**：建议每张图片 < 500KB

## 📝 注意事项

1. 所有图片文件名必须与上述列表完全一致（包括大小写）
2. 如果暂时没有头图，可以先使用封面图代替
3. 图片上传后，刷新页面即可看到效果

## ✅ 完成后验证

将所有图片放入对应目录后，访问：
- 首页：http://localhost:5200/
- 作品集页面：http://localhost:5200/works
- 像素世界详情页：http://localhost:5200/projects/pixel-world
