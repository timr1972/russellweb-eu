// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'http://git.russellweb.eu/',
  
  vite: {
	plugins: [tailwindcss()],
  },
});
