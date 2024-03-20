import type { Options } from '@wdio/types';

export const config: Options.Testrunner = {
  specs: [],
  capabilities: [],
  logLevel: 'debug',
  bail: 0,
  baseUrl: 'http://127.0.0.1:3000',
  waitforTimeout: 45_000,
  connectionRetryTimeout: 120_000,
  connectionRetryCount: 3,
  services: [],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 3 * 60 * 1000,
  },
};
