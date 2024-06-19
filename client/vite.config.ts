import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();
const PORTNUM = process.env.VITE_PORT_FRONT || '';
const HOST = process.env.VITE_HOST_FRONT || '';
if (!PORTNUM || !HOST) {
  console.error("Erreur: Veuillez configurer le fichier .env");
  process.exit(1);
}
const PORT = parseInt(PORTNUM as string);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: HOST,
    port: PORT,
  },
});
