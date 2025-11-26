import { getEnvVar } from '@shared/env-loader';
import { createDbClient } from '@db/helpers/create-db-client';

export const db = createDbClient(getEnvVar('DATABASE_URL'));
