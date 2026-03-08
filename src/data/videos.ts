export interface Video {
  id: string;
  title: string;
  description: string;
  tags: string[];
  iframeCode: string;
  coverUrl: string;
}

export const videos: Video[] = [
  {
    id: "nv-daxuesheng-de-yitian-meme",
    title: "女大学生的亿天（meme 版）",
    description: "一部充满 meme 元素的创意视频作品，以幽默诙谐的方式展现女大学生的日常生活。通过夸张的表现手法和网络流行文化元素，创造出独特的视觉体验和共鸣感。",
    tags: ["创意视频", "meme", "日常"],
    iframeCode: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116192001922746&bvid=BV1z8NuzHE7o&cid=36545103128&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
    coverUrl: "/assets/videos/nv-daxuesheng-de-yitian-meme.webp"
  },
  {
    id: "sony-boy",
    title: "Sony Boy",
    description: "以 Sony 品牌为主题的创意视频作品，展现科技与艺术的完美融合。通过精心设计的镜头语言和视觉效果，探索现代科技产品的美学表达。",
    tags: ["剪辑", "动漫", "意识流"],
    iframeCode: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116192018766656&bvid=BV15ZNMz5EzW&cid=36545168318&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
    coverUrl: "/assets/videos/sony-boy.webp"
  },
  {
    id: "wo-de-zangli",
    title: "我的葬礼",
    description: "一部富有哲思与艺术性的创意短片，通过独特的视角探讨生命与死亡的主题。运用象征性的视觉元素和叙事手法，引发观众对生命意义的深度思考。",
    tags: ["手绘短片", "叙事", "可爱"],
    iframeCode: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116192001989373&bvid=BV1f8NuzHEtG&cid=36545105290&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
    coverUrl: "/assets/videos/wo-de-zangli.webp"
  },
  {
    id: "ci-ci-shurufa",
    title: "刺刺输入法",
    description: "充满想象力的创意作品，将输入法这一日常工具拟人化、艺术化。通过趣味性的视觉表现和动态设计，展现科技产品与用户情感之间的有趣连接。",
    tags: ["宣传动画", "产品演示", "手绘短片"],
    iframeCode: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116192035544746&bvid=BV15dNMz1EfL&cid=36545299838&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
    coverUrl: "/assets/videos/ci-ci-shurufa.webp"
  },
  {
    id: "hudielan",
    title: "蝴蝶兰",
    description: "以蝴蝶兰为灵感创作的视觉艺术作品，展现自然之美与现代设计的融合。通过细腻的镜头语言和精致的色彩运用，呈现出如诗如画的视觉体验。",
    tags: ["自然美学", "广告创意", "手绘短片"],
    iframeCode: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116192438131212&bvid=BV1cCNMz9Eef&cid=36547267951&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
    coverUrl: "/assets/videos/hudielan.webp"
  },
  {
    id: "qiu",
    title: "秋",
    description: "以秋季为主题的意境短片，捕捉秋天的独特韵味和情感氛围。通过诗意的画面和细腻的情感表达，带领观众进入一个充满诗意与思考的秋日世界。",
    tags: ["二十四节气", "文物修复", "宣传动画"],
    iframeCode: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116192438195766&bvid=BV1HCNMz9EHo&cid=36547464556&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
    coverUrl: "/assets/videos/qiu.webp"
  }
];
