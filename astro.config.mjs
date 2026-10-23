// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://timr1972.github.io',
  base: '/<your-repo-name>',
});


// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
});
