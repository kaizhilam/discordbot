import { Client } from 'discord.js';
import { actionManager } from '../../actions';
import { IPayload, Event as PayloadEvent } from '../../utils';
import { Event } from '..';

interface IMessage {
  bot: Client;
  payloads: IPayload[];
}

export function message(props: IMessage): void {
  const { bot, payloads } = props;

  const events = payloads.filter((payload) => payload.event === PayloadEvent.message);

  bot.on(Event.message, (msg) => {
    events.forEach((event) => {
      const { args, actions } = event;
      const { message, ignoreCase } = args;
      if (ignoreCase) {
        if (msg.content.toLowerCase() === message.toLowerCase()) {
          actionManager({ message: msg, actions });
        }
      } else {
        if (msg.content === message) {
          actionManager({ message: msg, actions });
        }
      }
    });
  });
}
