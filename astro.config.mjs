import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.zioncreative.co',
  output: 'static',
  integrations: [sitemap()],
});
