import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import mkcert from "vite-plugin-mkcert";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    compression({ algorithm: "gzip" }),
    compression({ algorithm: "brotliCompress", exclude: [/\.(br)$/, /\.(gz)$/] }),
    sitemap({
      hostname: "https://achemeupet.com.br",
      changefreq: "daily",
      dynamicRoutes: [
        "/",
        "/adocoes",
        "/adocoes/como-adotar",
        "/perdidos",
        "/encontrados",
        "/faq",
        "/sobre",
        "/contato",
        "/adocao-responsavel",
        "/termos-de-uso-e-politica-de-privacidade",
      ],
      exclude: [
        "/login",
        "/registrar",
        "/esqueci-senha",
        "/redefinir-senha",
        "/minha-conta",
        "/alertas-salvos",
        "/meus-alertas",
        "/adocoes/novo",
        "/adocoes/editar/*",
        "/*",
      ],
    }),
  ],
  build: {
    sourcemap: "hidden", // Generates sourcemaps but in separate files
    minify: "terser", // Use Terser for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
  },
});
