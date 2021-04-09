import { actionManager } from '../../actions';
import { Event } from '../../utils';
import { IEventProps, ClientEvent } from '..';

export function message(props: IEventProps): void {
  const { bot, payloads, config, guild } = props;

  const events = payloads.filter((payload) => payload.event === Event.message);

  bot.on(ClientEvent.message, (msg) => {
    events.forEach((event) => {
      const { args, actions } = event;
      const { message, ignoreCase, channel, member } = args;
      let chosenChannel;
      if (channel) {
        chosenChannel = guild.channels.cache.find((c) => c.name === channel);
      }
      let flow = true;
      if (chosenChannel) {
        flow = flow && msg.channel === chosenChannel;
      }
      if (member) {
        flow = flow && msg.author.tag === member;
      }
      if (ignoreCase) {
        flow = flow && msg.content.toLowerCase() === message.toLowerCase();
      }
      if (!ignoreCase) {
        flow = flow && msg.content === message;
      }
      if (flow) {
        actionManager({ guild, actions, config, event });
      }
    });
  });
}
