import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://soliton-docs.vercel.app',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: 'Soliton Physics',
      description: 'A research-grade, educational physics engine. Every explanation sits next to a live simulation.',
      logo: { src: './src/assets/logo.svg' },
      favicon: '/favicon.svg',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/soliton-physics' }],
      customCss: ['katex/dist/katex.min.css', './src/styles/custom.css'],
      editLink: { baseUrl: 'https://github.com/soliton-physics/docs/edit/main/' },
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'What is a soliton?', slug: 'start/what-is-a-soliton' },
            { label: 'Install', slug: 'start/install' },
            { label: 'How the docs work', slug: 'start/how-the-docs-work' },
          ],
        },
        { label: 'Mechanics, class 11', items: [{ autogenerate: { directory: 'mechanics' } }] },
        { label: 'Waves', items: [{ autogenerate: { directory: 'physics' } }] },
        { label: 'Numerics', items: [{ autogenerate: { directory: 'numerics' } }] },
        { label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
        { label: 'Roadmap', slug: 'roadmap' },
      ],
    }),
  ],
});
