import { actionManager } from '../../actions';
import { Event } from '../../utils';
import { IEventProps } from '..';
import { ClientEvent } from '..';

export function message(props: IEventProps): void {
  const { bot, payloads, config, guild } = props;

  const events = payloads.filter((payload) => payload.event === Event.message);

  bot.on(ClientEvent.message, (msg) => {
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
