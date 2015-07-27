Package.describe({
  name: 'gbit:fakefill',
  version: '0.0.1',
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
  
  api.use('aldeed:simple-schema@1.3.3');
  api.imply('aldeed:simple-schema');

  api.use('mongo@1.1.0');
  api.imply('mongo');

  api.use('underscore@1.0.3');
  api.imply('underscore');

  api.use('gbit:faker@0.0.3');
  api.imply('gbit:faker');
  
  api.addFiles('lib/fakefill.js', 'server');
  api.addFiles('lib/fakefill-util.js', 'server');
  api.export('Fakefill', 'server');
});

Package.onTest(function(api){
  api.use('tinytest');
  api.use('gbit:fakefill');
  api.use('aldeed:simple-schema');
  api.use('gbit:faker');
  api.use('mongo');
  
  api.addFiles('tests/fakefill-tests.js', 'server'); 
});