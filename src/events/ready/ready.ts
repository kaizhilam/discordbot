import { Client } from 'discord.js';
import { actionManager } from '../../actions';
import { IPayload, Event as PayloadEvent, IConfig } from '../../utils';
import { Event } from '..';

interface IReady {
  bot: Client;
  payloads: IPayload[];
  config: IConfig;
}

export function ready(props: IReady): void {
  const { bot, payloads, config } = props;
  const events = payloads.filter((payload) => payload.event === PayloadEvent.ready);
  bot.on(Event.ready, () => {
    events.forEach((event) => {
      const { actions } = event;
      actionManager({ bot, actions, config });
    });
  });
}
