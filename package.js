Package.describe({
  name: 'gbit:fakefill',
  version: '0.0.2',
  summary: 'Create a random fake data such as names, addresses, and phone numbers based in your SimpleSchema',
  git: 'https://github.com/girassolbit/meteor-fakefill.git',
  documentation: 'README.md'
});

Npm.depends({
  'faker': '3.0.0',
  'clj-fuzzy': '0.2.1'
});

Package.onUse(function(api){
  api.versionsFrom('METEOR@1.1.0.2');
  
  api.use('aldeed:simple-schema');
  api.use('mongo');
  api.use('underscore');
  
  api.addFiles('lib/fakefill.js', 'server');
  api.addFiles('lib/fakefill-util.js', 'server');
  api.export('Fakefill', 'server');
  api.export('faker', 'server');
});

Package.onTest(function(api){
  api.use('tinytest');
  api.use('gbit:fakefill');
  api.use('aldeed:simple-schema');
  api.use('mongo');
  
  api.addFiles('tests/fakefill-tests.js', 'server'); 
});