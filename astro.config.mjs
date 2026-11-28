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
        'Physics explained beside live simulations you can play with: mechanics, waves, heat, circuits, magnetism, optics, modern physics and solitons, for the curious, for students of class 11 and 12, and for developers using the engine.',
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://solitonplay.com/og.png' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://solitonplay.com/og.png' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: 'https://solitonplay.com/apple-touch-icon.png' } },
        // Search engines want a bitmap icon; the SVG one alone often shows as a blank globe in results.
        { tag: 'link', attrs: { rel: 'icon', href: '/favicon.ico', sizes: '48x48' } },
        { tag: 'link', attrs: { rel: 'icon', href: '/icon-192.png', type: 'image/png', sizes: '192x192' } },
        // Vercel Web Analytics: visits counted without cookies. Your own visits: open any page once with
        // ?analytics=off and this browser is no longer counted; ?analytics=on undoes it.
        { tag: 'script', content: `(function () { var q = new URLSearchParams(location.search).get('analytics'); try { if (q === 'off') localStorage.setItem('soliton-analytics', 'off'); if (q === 'on') localStorage.removeItem('soliton-analytics'); } catch (e) {} var off = false; try { off = localStorage.getItem('soliton-analytics') === 'off'; } catch (e) {} window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); }; if (off) window.va('beforeSend', function () { return null; }); if (q === 'off' || q === 'on') alert(off ? 'Done: visits from this browser are no longer counted in Soliton analytics. Open any page with ?analytics=on to undo.' : 'Done: visits from this browser are counted again.'); })();` },
        { tag: 'script', attrs: { defer: true, src: '/_vercel/insights/script.js' } },
      ],
      logo: { src: './src/assets/logo.svg' },
      components: {
        ThemeProvider: './src/components/overrides/ThemeProvider.astro',
        ThemeSelect: './src/components/overrides/ThemeSelect.astro',
        SocialIcons: './src/components/overrides/SocialIcons.astro',
      },
      expressiveCode: {
        themes: ['github-dark-default'],
        styleOverrides: {
          borderRadius: '12px',
          borderColor: 'rgba(148, 163, 184, 0.18)',
          codeBackground: 'rgba(8, 12, 28, 0.85)',
          frames: {
            editorTabBarBackground: 'rgba(255, 255, 255, 0.03)',
            terminalTitlebarBackground: 'rgba(255, 255, 255, 0.03)',
            frameBoxShadowCssValue: 'none',
          },
        },
      },
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
        { label: 'Blog', items: [{ autogenerate: { directory: 'blog' } }] },
        { label: 'Roadmap', slug: 'roadmap' },
      ],
    }),
  ],
});
