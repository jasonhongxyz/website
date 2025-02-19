import { defineConfig, sharpImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import remarkUnwrapImages from "remark-unwrap-images";

// https://astro.build/config
export default defineConfig({
	site: "https://jsnhong.com",
	markdown: {
		remarkPlugins: [remarkUnwrapImages],
		shikiConfig: {
			theme: "dracula",
			wrap: true,
		},
	},
	image: {
		// https://docs.astro.build/en/guides/assets/#using-sharp
		service: sharpImageService(),
	},
	integrations: [
		mdx({}),
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap(),
	],
  prefetch: true,
  assets: true,
	compressHTML: true,
	vite: {
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});
