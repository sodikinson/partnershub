import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const target = env.VITE_SURVEY_SCRIPT_URL

  return {
    plugins: [
      react(),
      {
        name: 'survey-proxy-middleware',
        configureServer(server) {
          server.middlewares.use('/survey-proxy', async (req, res, next) => {
            if (req.method !== 'POST') return next()
            try {
              let body = ''
              req.setEncoding('utf8')
              req.on('data', (chunk) => (body += chunk))
              req.on('end', async () => {
                try {
                  const upstream = await fetch(target, {
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    body,
                    redirect: 'follow',
                  })
                  const text = await upstream.text()
                  res.statusCode = upstream.status
                  const upstreamCT = upstream.headers.get('content-type') || ''
                  const ct = upstreamCT ? upstreamCT : 'text/plain; charset=utf-8'
                  res.setHeader('content-type', ct)
                  res.end(text)
                } catch (err) {
                  res.statusCode = 500
                  res.setHeader('content-type', 'application/json')
                  res.end(JSON.stringify({ ok: false, error: err.message }))
                }
              })
            } catch (err) {
              res.statusCode = 500
              res.setHeader('content-type', 'application/json')
              res.end(JSON.stringify({ ok: false, error: err.message }))
            }
          })
        },
      },
    ],
    // Remove Vite built-in proxy for /survey-proxy to avoid conflicts
    // Our custom middleware above handles POST forwarding and redirects.
  }
})
