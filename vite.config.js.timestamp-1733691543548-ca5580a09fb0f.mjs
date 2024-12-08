// vite.config.js
import { defineConfig } from "file:///D:/WEB%20DEV/PHP%20Laravel/interview-p/todo/node_modules/vite/dist/node/index.js";
import laravel from "file:///D:/WEB%20DEV/PHP%20Laravel/interview-p/todo/node_modules/laravel-vite-plugin/dist/index.js";
import vue from "file:///D:/WEB%20DEV/PHP%20Laravel/interview-p/todo/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///D:/WEB%20DEV/PHP%20Laravel/interview-p/todo/node_modules/unplugin-vue-components/dist/vite.js";
import { PrimeVueResolver } from "file:///D:/WEB%20DEV/PHP%20Laravel/interview-p/todo/node_modules/@primevue/auto-import-resolver/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [PrimeVueResolver()]
    }),
    laravel({
      input: ["resources/css/app.css", "resources/src/main.js"],
      refresh: true
    })
  ],
  resolve: {
    alias: {
      "@": "/resources/src"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXRUIgREVWXFxcXFBIUCBMYXJhdmVsXFxcXGludGVydmlldy1wXFxcXHRvZG9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdFQiBERVZcXFxcUEhQIExhcmF2ZWxcXFxcaW50ZXJ2aWV3LXBcXFxcdG9kb1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV0VCJTIwREVWL1BIUCUyMExhcmF2ZWwvaW50ZXJ2aWV3LXAvdG9kby92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgbGFyYXZlbCBmcm9tIFwibGFyYXZlbC12aXRlLXBsdWdpblwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IFByaW1lVnVlUmVzb2x2ZXIgfSBmcm9tIFwiQHByaW1ldnVlL2F1dG8taW1wb3J0LXJlc29sdmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICB2dWUoKSxcbiAgICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgICAgICByZXNvbHZlcnM6IFtQcmltZVZ1ZVJlc29sdmVyKCldLFxuICAgICAgICB9KSxcbiAgICAgICAgbGFyYXZlbCh7XG4gICAgICAgICAgICBpbnB1dDogW1wicmVzb3VyY2VzL2Nzcy9hcHAuY3NzXCIsIFwicmVzb3VyY2VzL3NyYy9tYWluLmpzXCJdLFxuICAgICAgICAgICAgcmVmcmVzaDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICBcIkBcIjogXCIvcmVzb3VyY2VzL3NyY1wiLFxuICAgICAgICB9LFxuICAgIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVQsU0FBUyxvQkFBb0I7QUFDbFYsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLHdCQUF3QjtBQUVqQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixXQUFXO0FBQUEsTUFDUCxXQUFXLENBQUMsaUJBQWlCLENBQUM7QUFBQSxJQUNsQyxDQUFDO0FBQUEsSUFDRCxRQUFRO0FBQUEsTUFDSixPQUFPLENBQUMseUJBQXlCLHVCQUF1QjtBQUFBLE1BQ3hELFNBQVM7QUFBQSxJQUNiLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLO0FBQUEsSUFDVDtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
