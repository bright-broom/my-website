export const navItems = ['about', 'works', 'contact'] as const;

export type Language = 'en' | 'ja';
export type Theme = 'light' | 'dark';

export const profileLinks = [
  { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/toshikisakuta/' },
  { name: 'GitHub', icon: 'github', href: 'https://github.com/bright-broom' },
] as const;

const english = {
  nav: { about: 'About', works: 'Works', contact: 'Contact' },
  switchLanguage: '日本語',
  toggleTheme: 'Toggle color theme',
  toggleMenu: 'Toggle menu',
  hero: {
    eyebrow: 'Cloud & Security Engineer · Tokyo, Japan',
    name: 'Toshiki Sakuta',
    lead: 'I build and secure infrastructure — from Azure cloud environments and networks to vulnerability assessment through log analysis.',
    primaryAction: 'View works',
    secondaryAction: 'Get in touch',
  },
  about: {
    eyebrow: '01 / About',
    heading: 'About me',
    paragraphs: [
      'An engineer from Hyogo Prefecture, I became fascinated with the world of the Web when a friend enjoyed a website I created as a hobby in the days before the iPhone was introduced to the world. I studied information technology at a technical high school and majored in industrial design at university. After graduation, I was involved in the design of electronic circuits for automobiles, and later moved to the IT industry, attracted by the potential of cloud technology.',
      'I started my career in technical support and experienced a wide range of work from networking to security measures, including Azure cloud server construction, security measures, and vulnerability diagnosis through log analysis.',
    ],
    skillsLabel: 'Focus',
    skills: ['Microsoft Azure', 'Networking', 'Security', 'Log analysis', 'Web development'],
    timelineLabel: 'Path',
    timeline: [
      { label: 'Technical high school', text: 'Information technology' },
      { label: 'University', text: 'Industrial design' },
      { label: 'Automotive', text: 'Electronic circuit design' },
      { label: 'IT industry', text: 'Technical support → cloud, network & security' },
    ],
  },
  works: {
    eyebrow: '02 / Works',
    heading: 'Works',
    viewProject: 'View project',
    projects: [
      {
        title: 'Web Development',
        description: 'Designing and building websites and web applications, from interface to deployment.',
        url: '/web-development',
      },
      {
        title: 'Cloud Solutions',
        description: 'Building and operating cloud environments centered on Microsoft Azure.',
        url: '/cloud-solutions',
      },
      {
        title: 'Security Analysis',
        description: 'Security hardening and vulnerability assessment through log analysis.',
        url: '/security-analysis',
      },
    ],
  },
  contact: {
    eyebrow: '03 / Contact',
    heading: 'Get in touch',
    lead: 'For work inquiries, collaborations, or just to say hello — feel free to reach out.',
    locationLabel: 'Location',
    location: 'Tokyo, Japan',
    linksLabel: 'Links',
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send message',
    },
  },
  footer: {
    copyright: '© 2024 Toshiki Sakuta',
    backToTop: 'Back to top',
  },
};

export type SiteContent = typeof english;
export type SiteProps = { t: SiteContent };

export const translations: Record<Language, SiteContent> = {
  en: english,
  ja: {
    nav: { about: 'プロフィール', works: '実績', contact: 'お問い合わせ' },
    switchLanguage: 'English',
    toggleTheme: 'カラーテーマを切り替える',
    toggleMenu: 'メニューを開閉する',
    hero: {
      eyebrow: 'クラウド & セキュリティエンジニア · 東京',
      name: '作田 敏希',
      lead: 'Azure を中心としたクラウド環境やネットワークの構築から、ログ分析による脆弱性診断まで。インフラをつくり、守るエンジニアです。',
      primaryAction: '実績を見る',
      secondaryAction: 'お問い合わせ',
    },
    about: {
      eyebrow: '01 / Profile',
      heading: 'プロフィール',
      paragraphs: [
        '兵庫県出身のエンジニアです。iPhone が世に出る前、趣味で作った Web サイトを友人が楽しんでくれたことをきっかけに、Web の世界に魅了されました。工業高校で情報技術を学び、大学では工業デザインを専攻。卒業後は自動車の電子回路設計に携わり、その後クラウド技術の可能性に惹かれて IT 業界へ転身しました。',
        'テクニカルサポートからキャリアをスタートし、Azure でのクラウドサーバー構築、セキュリティ対策、ログ分析による脆弱性診断など、ネットワークからセキュリティまで幅広い業務を経験しています。',
      ],
      skillsLabel: '専門領域',
      skills: ['Microsoft Azure', 'ネットワーク', 'セキュリティ', 'ログ分析', 'Web 開発'],
      timelineLabel: '経歴',
      timeline: [
        { label: '工業高校', text: '情報技術' },
        { label: '大学', text: '工業デザイン' },
        { label: '自動車業界', text: '車載電子回路の設計' },
        { label: 'IT 業界', text: 'テクニカルサポート → クラウド・ネットワーク・セキュリティ' },
      ],
    },
    works: {
      eyebrow: '02 / Works',
      heading: '実績',
      viewProject: '詳しく見る',
      projects: [
        {
          title: 'Web 開発',
          description: 'Web サイト・Web アプリケーションの設計から実装、公開まで。',
          url: '/web-development',
        },
        {
          title: 'クラウドソリューション',
          description: 'Microsoft Azure を中心としたクラウド環境の構築と運用。',
          url: '/cloud-solutions',
        },
        {
          title: 'セキュリティ分析',
          description: 'ログ分析による脆弱性診断とセキュリティ対策。',
          url: '/security-analysis',
        },
      ],
    },
    contact: {
      eyebrow: '03 / Contact',
      heading: 'お問い合わせ',
      lead: 'お仕事のご相談など、お気軽にご連絡ください。',
      locationLabel: '所在地',
      location: '東京都',
      linksLabel: 'リンク',
      form: {
        name: 'お名前',
        email: 'メールアドレス',
        message: 'メッセージ',
        submit: '送信する',
      },
    },
    footer: {
      copyright: '© 2024 作田 敏希',
      backToTop: 'ページの先頭へ',
    },
  },
};
