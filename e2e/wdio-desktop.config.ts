import { join } from 'node:path';
import type { Options } from '@wdio/types';

import { config as baseConfig } from './wdio-base.config';

export const config: Options.Testrunner = {
  ...baseConfig,
  specs: ['./desktop/**/*.spec.ts'],
  capabilities: [
    {
      maxInstances: 1,
      'tauri:options': {
        application: join(process.cwd(), '../app/src-tauri', 'macos.v1.0.0.zip'),
      },
    },
  ],
};
