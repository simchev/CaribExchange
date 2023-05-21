import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { chatServerPlugin } from './src/lib/server/plugins.js';

export default defineConfig({
	plugins: [sveltekit(), chatServerPlugin]
});
