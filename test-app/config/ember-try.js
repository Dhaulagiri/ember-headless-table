'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  let releaseVersion = await getChannelURL('release');
  let embroiderVersion = '^1.9.0';

  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            'ember-source': '~3.28.0',
          },
        },
      },
      {
        name: 'ember-4.0',
        npm: {
          devDependencies: {
            'ember-source': '~4.0.0',
          },
        },
      },
      {
        name: 'ember-lts-4.4',
        npm: {
          devDependencies: {
            'ember-source': '~4.4.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': releaseVersion,
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
        },
      },
      embroiderSafe({
        name: 'ember-release + embroider-safe',
        npm: {
          devDependencies: {
            '@embroider/core': embroiderVersion,
            '@embroider/webpack': embroiderVersion,
            '@embroider/compat': embroiderVersion,
            'ember-source': releaseVersion,
          },
        },
      }),
      embroiderOptimized({
        name: 'ember-release + embroider-optimized',
        npm: {
          devDependencies: {
            '@embroider/core': embroiderVersion,
            '@embroider/webpack': embroiderVersion,
            '@embroider/compat': embroiderVersion,
            'ember-source': releaseVersion,
          },
        },
      }),
      embroiderOptimized({
        name: 'ember-lts-3.28 + embroider-optimized',
        npm: {
          devDependencies: {
            '@embroider/core': embroiderVersion,
            '@embroider/webpack': embroiderVersion,
            '@embroider/compat': embroiderVersion,
            'ember-source': '~3.28.0',
          },
        },
      }),
      embroiderOptimized({
        name: 'ember-lts-4.4 + embroider-optimized',
        npm: {
          devDependencies: {
            '@embroider/core': embroiderVersion,
            '@embroider/webpack': embroiderVersion,
            '@embroider/compat': embroiderVersion,
            'ember-source': '~4.4.0',
          },
        },
      }),
    ],
  };
};
