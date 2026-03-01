// Get site URL from environment variable, use default value if not set
// Note: Please set the correct PUBLIC_SITE_URL in .env file after first deployment
const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://ricoui-portfolio.pages.dev/';

// 导航
export const siteConfig = {
	 title: "My Portfolio",
	 author: "My Portfolio",
	 url: SITE_URL,
	 mail: "",
	// resume add your resume file path here: /assets/resume.pdf
	 resume:{
		 btn: "Resume",
		 url: "#",
		 target: "_blank",
	},
	 utm: {
		 source: `${SITE_URL}`,
		 medium: "referral",
		 campaign: "navigation",
	},
	 meta:{
		 title: "My Portfolio",
		 description: "Welcome to my portfolio website!",
		 keywords: "portfolio, design, code, personal website",
		 image: `${SITE_URL}/og.jpg`,
		 twitterHandle: "",
	},
	// social links
	 social:{
		 twitter: "#",
		 twitterName: "",
		 github: "#",
		 blog: "#",
		 xiaohongshu:"#"
	},
};

// 底部导航
export const socialLinks = [];