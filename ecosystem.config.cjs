module.exports = {
  apps : [{
    name: 'blog',
    script: 'http-server',
    args: './dist -g -p 8080',
    watch: ['dist']
  }]
};
