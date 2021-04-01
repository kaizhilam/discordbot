import { actionManager } from '../../actions';
import { Event } from '../../utils';
import { ClientEvent, IEventProps } from '..';

export function ready(props: IEventProps): void {
  const { bot, payloads, config, guild } = props;
  const events = payloads.filter((payload) => payload.event === Event.ready);
  bot.on(ClientEvent.ready, () => {
    events.forEach((event) => {
      const { actions } = event;
      actionManager({ guild, actions, config });
    });
  });
}
