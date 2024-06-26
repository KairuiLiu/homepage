import { defineConfig } from 'vite';
import { resolve } from 'path';
import path from 'path';
import styleImport from 'vite-plugin-style-import';
// import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// VitePWA({
		// 	registerType: 'autoUpdate',
		// 	includeAssets: [
		// 		'favicon.svg',
		// 		'favicon.ico',
		// 		'robots.txt',
		// 		'apple-touch-icon.png',
		// 	],
		// 	manifest: {
		// 		name: "Kairui's Website",
		// 		short_name: "Kairui's Website",
		// 		description: "Kairui's Website",
		// 		theme_color: '#FFE3EC',
		// 		lang: 'zh-Hans',
		// 		icons: [
		// 			{
		// 				src: 'android-chrome-192x192.png',
		// 				sizes: '192x192',
		// 				type: 'image/png',
		// 			},
		// 			{
		// 				src: 'android-chrome-512x512.png',
		// 				sizes: '512x512',
		// 				type: 'image/png',
		// 			},
		// 			{
		// 				src: 'android-chrome-512x512.png',
		// 				sizes: '512x512',
		// 				type: 'image/png',
		// 				purpose: 'any maskable',
		// 			},
		// 		],
		// 	},
		// }),
	],
	publicDir: 'public',
	server: {
		host: '0.0.0.0',
		proxy: {
			'/socket.io': {
				target: 'http://127.0.0.1:9000/',
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			pages: path.resolve(__dirname, './src/pages'),
			utils: path.resolve(__dirname, './src/utils'),
			configs: path.resolve(__dirname, './src/configs'),
		},
		extensions: ['.js', '.json', '.ts'], // 使用路径别名时想要省略的后缀名，可以自己 增减
	},
	// 由于项目./doc中有index.html, 所以要显式忽略doc文件夹并指定index.html
	optimizeDeps: {
		exclude: ['doc'],
		entries: './index.html',
	},
	build: {
		// terserOptions: {
		// 	compress: {
		// 		//生产环境时移除console
		// 		drop_console: true,
		// 		drop_debugger: true,
		// 	},
		// },
		minify: true,
		// 取消计算文件大小，加快打包速度
		brotliSize: false,
		sourcemap: false,
		// assetsDir: 'static/img',
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				en: resolve(__dirname, 'en/index.html'),
			},
			output: {
				chunkFileNames: 'js/[name]-[hash].js',
				entryFileNames: 'js/[name]-[hash].js',
				assetFileNames: '[ext]/[name]-[hash].[ext]',
			},
		},
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
});
