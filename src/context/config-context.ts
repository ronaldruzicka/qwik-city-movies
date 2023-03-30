import type { Config } from '~/api/types';

import { createContextId } from '@builder.io/qwik';

export const ConfigContext = createContextId<Config>('config');
