module.exports = {
  apps: [{
    name: 'budgy',
    script: './.output/server/index.mjs',
    max_restarts: 3,
  }],
}
