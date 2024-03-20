import { join } from 'node:path';
import type { Options } from '@wdio/types';

import { config as baseConfig } from './wdio-base.config';

export const config: Options.Testrunner = {
  ...baseConfig,
  specs: ['./mobile/**/*.spec.ts'],
  capabilities: [
    {
      platformName: 'iOS',
      maxInstances: 1,
      'appium:deviceName': process.env.GITHUB_ACTION ? 'iPhone 14' : 'iPhone 15',
      'appium:platformVersion': '17.2',
      'appium:orientation': 'PORTRAIT',
      'appium:automationName': 'XCUITest',
      'appium:app': join(process.cwd(), '../app/src-tauri', 'ios.v1.0.0.zip'),
      'appium:newCommandTimeout': 240,
      'appium:webviewConnectTimeout': 5000,
    },
  ],
};
