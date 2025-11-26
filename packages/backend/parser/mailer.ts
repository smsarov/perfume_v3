import { createMailer } from '@shared/mailer';
import { getEnvVar } from '@shared/env-loader';

const user = getEnvVar("EMAIL_SENDER");
const password = getEnvVar("APP_PASSWORD");

export const Mailer = createMailer({user, password});
