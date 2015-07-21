Package.describe({
  name: 'girassolbit:fakefill',
  version: '0.0.1',
  summary: 'Create a random fake document based in a SimpleSchema',
  git: '',
  documentation: 'README.md'
});

Npm.depends({
  'faker': '3.0.0',
  'underscore': '1.8.3',
  'clj-fuzzy': '0.2.1'
});

Package.onUse(function(api){
  api.versionsFrom('1.1.0.2');
  
  api.use('aldeed:simple-schema@1.3.2');
  api.imply('aldeed:simple-schema');
  
  api.addFiles(['fakefill-util.js', 'fakefill.js'], ['server']);
  api.export(['Fakefill', 'faker'], ['server']);
});

Package.onTest(function(api){
  api.use('tinytest');
  api.use('girassolbit:fakefill');
  api.use('aldeed:simple-schema@1.3.2');
  api.addFiles('fakefill-tests.js', ['server']); 
});