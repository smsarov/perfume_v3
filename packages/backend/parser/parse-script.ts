import cron from 'node-cron';
import { parse } from './parse';

const scheduleTimes = ['10 11 * * 1-5', '10 17 * * 1-5'];

console.log('Parser service started. Scheduled times:', scheduleTimes);
console.log('Current timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
console.log('Current time:', new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));

scheduleTimes.forEach((cronTime) => {
  cron.schedule(cronTime, async () => {
    try {
      console.log(`Running parse at ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`);
      await parse();
    } catch (err) {
      console.error('Error running parse:', err);
    }
  });
  console.log(`Scheduled cron job: ${cronTime}`);
});


console.log('Parser service is running and waiting for scheduled tasks...');
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});
