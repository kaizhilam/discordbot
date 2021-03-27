import { Client, Guild } from 'discord.js';
import { IPayload, Event as PayloadEvent, IConfig } from '../../utils';
import { Event } from '..';
import { actionManager } from '../../actions';

interface IVoiceStateUpdate {
  bot: Client;
  guild: Guild;
  payloads: IPayload[];
  config: IConfig;
}

export function voiceStateUpdate(props: IVoiceStateUpdate): void {
  const { bot, payloads, config, guild } = props;

  const onVoiceChannelConnect = payloads.filter((payload) => payload.event === PayloadEvent.onVoiceChannelConnect);
  const onVoiceChannelDisconnect = payloads.filter(
    (payload) => payload.event === PayloadEvent.onVoiceChannelDisconnect,
  );

  bot.on(Event.voiceStateUpdate, (oldVoiceState, newVoiceState) => {
    if (newVoiceState.channel) {
      onVoiceChannelConnect.forEach((event) => {
        const { args, actions } = event;
        const { member } = args;
        if (member === newVoiceState.member.user.tag) {
          actionManager({ actions, config, guild });
        }
      });
    } else if (oldVoiceState.channel) {
      onVoiceChannelDisconnect.forEach((event) => {
        const { args, actions } = event;
        const { member } = args;
        if (member === oldVoiceState.member.user.tag) {
          actionManager({ actions, config, guild });
        }
      });
    }
  });
}
