// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Isaac's Portfolio",
  tagline: "Showcasing My Work and Thoughts",
  favicon: "img/favicon.ico",

  ////////////////////////////////////////////////////////////////////////////
  url: "https://gadzooks43.github.io", // Replace with your actual domain
  baseUrl: "/isaac-portfolio-template/",

  organizationName: "Gadzooks43", // Replace with your GitHub org/user name
  projectName: "Isaac-portfolio-template", // Replace with your repo/project name
  ////////////////////////////////////////////////////////////////////////////

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false, // Disable docs if not needed
        blog: {
          showReadingTime: true,
          // Add any additional blog configuration if needed
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Isaac Kenney Portfolio",
        logo: {
          alt: "My UI Portfolio Logo",
          src: "img/logo.svg",
        },
        items: [
          { to: "/contact", label: "Contact", position: "right" },
          {
            ////////////////////////////////////////////////////////////////////////////
            href: "https://github.com/gadzooks43/isaac-portfolio-template",
            ////////////////////////////////////////////////////////////////////////////
            label: "GitHub",
            position: "right",
          },
        ],
      },
      // footer: {
      //   style: "dark",
      //   links: [
      //     // {
      //     //   title: "About Me",
      //     //   items: [{ label: "About Me", to: "/about-me" }],
      //     // },
      //     // {
      //     //   title: "Projects",
      //     //   items: [{ label: "Projects", to: "/projects" }],
      //     // },
      //     // {
      //     //   title: "Blog",
      //     //   items: [{ label: "Blog", to: "/blog" }],
      //     // },
      //     // {
      //     //   title: "Community",
      //     //   items: [
      //     //     {
      //     //       label: "GitHub",
      //     //       ////////////////////////////////////////////////////////////////////////////
      //     //       href: "https://github.com/gadzooks43/isaac-portfolio-template",
      //     //       ////////////////////////////////////////////////////////////////////////////
      //     //     },
      //     //   ],
      //     // },
      //   ],
      //   copyright: `Copyright © ${new Date().getFullYear()} My UI Portfolio. Built with Docusaurus.`,
      // },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
