
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d114ca183d4f43ceb5c9480462cb2e86',
  appName: 'glow-get-it-advisor',
  webDir: 'dist',
  server: {
    url: 'https://d114ca18-3d4f-43ce-b5c9-480462cb2e86.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: {
        camera: "Camera access is required to capture photos for makeup analysis"
      }
    }
  }
};

export default config;
