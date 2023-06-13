module.exports = {
  apps : [{
    name: 'blog',
    script: 'http-server',
    args: './dist -g -p 80',
    watch: ['dist']
  }]
};
