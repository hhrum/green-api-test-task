import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const repositoryName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'green-api-test-task'

const base = process.env.GITHUB_PAGES === 'true' ? `/${repositoryName}/` : '/'

const config = defineConfig({
  base,
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
      },
      router: {
        entry: 'app/router',
        routesDirectory: 'app/routes',
        generatedRouteTree: 'app/routeTree.gen.ts',
      },
    }),
    viteReact(),
  ],
})

export default config
