require('dotenv').config()

const apps = []

if (process.env.NODE_ENV === 'development') {
  apps.push({
    name: 'products-app',
    script: "node app.js",
    watch: false,
    ignore_watch: ['./data', 'node_modules', '.history', '.git', 'public', 'root', '.env', '.wwebjs_auth'],
  })
} else {
  apps.push({
    name: 'products-app',
    script: 'node app.js',
    watch: false,
  })
}

module.exports = { apps }