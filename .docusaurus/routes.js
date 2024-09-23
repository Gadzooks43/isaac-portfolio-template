import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/ui-portfolio-template/about-me',
    component: ComponentCreator('/ui-portfolio-template/about-me', '394'),
    exact: true
  },
  {
    path: '/ui-portfolio-template/blog',
    component: ComponentCreator('/ui-portfolio-template/blog', 'acd'),
    exact: true
  },
  {
    path: '/ui-portfolio-template/blog/archive',
    component: ComponentCreator('/ui-portfolio-template/blog/archive', 'a29'),
    exact: true
  },
  {
    path: '/ui-portfolio-template/blog/example-blog-post',
    component: ComponentCreator('/ui-portfolio-template/blog/example-blog-post', '6d9'),
    exact: true
  },
  {
    path: '/ui-portfolio-template/blog/tags',
    component: ComponentCreator('/ui-portfolio-template/blog/tags', 'da6'),
    exact: true
  },
  {
    path: '/ui-portfolio-template/blog/tags/freeform',
    component: ComponentCreator('/ui-portfolio-template/blog/tags/freeform', '07d'),
    exact: true
  },
  {
    path: '/ui-portfolio-template/contact',
    component: ComponentCreator('/ui-portfolio-template/contact', 'd6b'),
    exact: true
  },
  {
    path: '/ui-portfolio-template/markdown-page',
    component: ComponentCreator('/ui-portfolio-template/markdown-page', '667'),
    exact: true
  },
  {
    path: '/ui-portfolio-template/projects',
    component: ComponentCreator('/ui-portfolio-template/projects', '344'),
    exact: true
  },
  {
    path: '/ui-portfolio-template/',
    component: ComponentCreator('/ui-portfolio-template/', 'bfd'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
