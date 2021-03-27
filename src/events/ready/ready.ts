import { Client, Guild } from 'discord.js';
import { actionManager } from '../../actions';
import { IPayload, Event as PayloadEvent, IConfig } from '../../utils';
import { Event } from '..';

interface IReady {
  bot: Client;
  guild: Guild;
  payloads: IPayload[];
  config: IConfig;
}

export function ready(props: IReady): void {
  const { bot, payloads, config, guild } = props;
  const events = payloads.filter((payload) => payload.event === PayloadEvent.ready);
  bot.on(Event.ready, () => {
    events.forEach((event) => {
      const { actions } = event;
      actionManager({ guild, actions, config });
    });
  });
}
