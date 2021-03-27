import { Client, Guild } from 'discord.js';
import { actionManager } from '../../actions';
import { IPayload, Event as PayloadEvent, IConfig } from '../../utils';
import { Event } from '..';

interface IMessage {
  bot: Client;
  payloads: IPayload[];
  config: IConfig;
  guild: Guild;
}

export function message(props: IMessage): void {
  const { bot, payloads, config, guild } = props;

  const events = payloads.filter((payload) => payload.event === PayloadEvent.message);

  bot.on(Event.message, (msg) => {
    events.forEach((event) => {
      const { args, actions } = event;
      const { message, ignoreCase } = args;
      if (ignoreCase) {
        if (msg.content.toLowerCase() === message.toLowerCase()) {
          actionManager({ guild, actions, config });
        }
      } else {
        if (msg.content === message) {
          actionManager({ guild, actions, config });
        }
      }
    });
  });
}
