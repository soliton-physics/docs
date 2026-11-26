import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://docs.solitonplay.com',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: 'Soliton Physics',
      description:
        'Physics for class 11 and 12, explained beside live simulations: mechanics, waves, thermodynamics, circuits, magnetism, optics and modern physics, each checked against the textbook answer.',
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://solitonplay.com/og.png' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://solitonplay.com/og.png' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: 'https://solitonplay.com/apple-touch-icon.png' } },
      ],
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
        { label: 'Waves, class 11', items: [{ autogenerate: { directory: 'waves' } }] },
        { label: 'Properties of matter, class 11', items: [{ autogenerate: { directory: 'matter' } }] },
        { label: 'Thermal physics, class 11', items: [{ autogenerate: { directory: 'thermal' } }] },
        { label: 'Electromagnetism, class 12', items: [{ autogenerate: { directory: 'electromagnetism' } }] },
        { label: 'Currents and magnetism, class 12', items: [{ autogenerate: { directory: 'magnetism' } }] },
        { label: 'Circuits, class 12', items: [{ autogenerate: { directory: 'circuits' } }] },
        { label: 'Optics, class 12', items: [{ autogenerate: { directory: 'optics' } }] },
        { label: 'Modern physics, class 12', items: [{ autogenerate: { directory: 'modern' } }] },
        { label: 'Solitons', items: [{ autogenerate: { directory: 'physics' } }] },
        { label: 'Numerics', items: [{ autogenerate: { directory: 'numerics' } }] },
        { label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
        { label: 'Roadmap', slug: 'roadmap' },
      ],
    }),
  ],
});
