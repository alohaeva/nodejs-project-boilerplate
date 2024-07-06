import { Broker } from '../index.ts';

export const testEventConsumer = Broker.setUpConsumer('test-event', async message => {
  console.log(message);
  return {
    success: true,
    result: {
      world: 'world',
    },
  };
});
