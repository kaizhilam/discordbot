import { Client } from 'discord.js';
import { IPayload, Event as PayloadEvent } from '../../utils';
import { Event } from '..';

interface IVoiceStateUpdate {
  bot: Client;
  payloads: IPayload[];
}

export function voiceStateUpdate(props: IVoiceStateUpdate): void {
  const { bot, payloads } = props;

  const onVoiceChannelConnect = payloads.filter((payload) => payload.event === PayloadEvent.onVoiceChannelConnect);
  const onVoiceChannelDisconnect = payloads.filter(
    (payload) => payload.event === PayloadEvent.onVoiceChannelDisconnect,
  );

  bot.on(Event.voiceStateUpdate, (oldVoiceState, newVoiceState) => {
    if (newVoiceState.channel) {
      console.log(newVoiceState.member.displayName);
    } else if (oldVoiceState.channel) {
      console.log(newVoiceState.member.displayName);
    }
  });
}
