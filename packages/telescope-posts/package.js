Package.describe({
  name: "telescope:posts",
  summary: "Telescope posts package",
  version: "0.1.2",
  git: "https://github.com/TelescopeJS/telescope-posts.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'jquery',
    'underscore',
    'mongo',
    'aldeed:simple-schema@1.3.2',
    'telescope:lib@0.3.0'
  ]);

  api.add_files([
    'lib/posts.js',
    'lib/config.js',
    'lib/helpers.js',
    'lib/hooks.js',
    'lib/methods.js'
  ], ['client', 'server']);

  api.add_files([
    'lib/server/publications.js'
  ], ['server']);

  api.export('Posts');

});