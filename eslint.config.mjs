// @ts-check

import eslint from '@eslint/js';
// @ts-ignore
import { defineConfig } from 'eslint/config';
// @ts-ignore
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
//   tseslint.configs.recommended,
 tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    rules:{
        "no-console":"warn"
    }
  }
);