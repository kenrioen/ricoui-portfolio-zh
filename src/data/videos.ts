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
    description: "猫 meme 视频曾在一段时间内衍生出了各种基于个人经验的二创视频，并拥有十分火热的流量，我在当时也十分受感染，加上我也酷爱整活，所以做出了这个基于我大学生活的视频，有时候再回看这个视频，我依然觉得搞笑并且怀念那段时光",
    tags: ["创意视频", "meme", "日常"],
    iframeCode: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116192001922746&bvid=BV1z8NuzHE7o&cid=36545103128&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
    coverUrl: "/assets/videos/nv-daxuesheng-de-yitian-meme.webp"
  },
  {
    id: "sony-boy",
    title: "Sony Boy",
    description: "《漂流少年》是一部我非常喜欢的动漫，可以说动画画风清爽，配乐也十分契合整部作品给人的那种独立动漫的感觉。一次观阅他人创作的启发下我也剪辑出了属于我的 sony boy 意识流视频",
    tags: ["剪辑", "动漫", "意识流"],
    iframeCode: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116192018766656&bvid=BV15ZNMz5EzW&cid=36545168318&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
    coverUrl: "/assets/videos/sony-boy.webp"
  },
  {
    id: "wo-de-zangli",
    title: "我的葬礼",
    description: "这个视频的构思其实是一场温暖的误会，小幽灵发现了一块无人的土堆于是放上了自己的相片，来补偿自己死亡的仪式感。路过的动物由于十分暖心纷纷献上了自己觉得能够贡献的'好的东西'，最后善意越来越多，明明象征死亡的土堆却显得十分温暖。最后出现的小浣熊十分淘气的将相片涂改成自己的样子，可以说是象征着不介意死亡，同时向往善意的举动",
    tags: ["手绘短片", "叙事", "可爱"],
    iframeCode: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116192001989373&bvid=BV1f8NuzHEtG&cid=36545105290&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
    coverUrl: "/assets/videos/wo-de-zangli.webp"
  },
  {
    id: "ci-ci-shurufa",
    title: "刺刺输入法",
    description: "刺刺输入法是一个对 ai 产品的畅想，我想象的是未来会出现一款嵌入了 ai 大模型的输入法来帮人们解决各个场景下需要交流沟通的难题。它有时候能帮你骂人，有时候能靠联机让别人夺舍你来解决沟通问题，也能帮你自动化的处理一些维权或者说一些僵硬的流程。技术原理就是通过读取你屏幕的信息来判断情况，然后给你相应的选项来选择如何自动化的帮你定制化的解决问题",
    tags: ["宣传动画", "产品演示", "手绘短片"],
    iframeCode: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116192035544746&bvid=BV15dNMz1EfL&cid=36545299838&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
    coverUrl: "/assets/videos/ci-ci-shurufa.webp"
  },
  {
    id: "hudielan",
    title: "蝴蝶兰",
    description: "这个其实是一个蝴蝶兰的软广告视频，视频内容是根据个人经历来绘制的动画：深入检出的宅人偶然养了一株蝴蝶兰，在悉心照顾的过程中看到了蝴蝶兰的花开花谢很是感动，并且在意识到植物也是生命的那一刻，明白自己就算是钢筋水泥里的宅人也是有人陪伴的",
    tags: ["自然美学", "广告创意", "手绘短片"],
    iframeCode: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116192438131212&bvid=BV1cCNMz9Eef&cid=36547267951&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
    coverUrl: "/assets/videos/hudielan.webp"
  },
  {
    id: "red-bird",
    title: "红色小鸟",
    description: "基于抗战时期的各个身份拟鸟化了多种形象",
    tags: ["红色", "小鸟", "手绘动画"],
    iframeCode: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116216177892974&bvid=BV1fecrzPExW&cid=36649896690&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
    coverUrl: "/assets/videos/red-bird.webp"
  }
];
