import { difference } from '../../utils';
import { ClientEvent, IEventProps, voiceConnect, voiceDisconnect, mute } from '..';
import { VoiceState } from 'discord.js';

export function voiceStateUpdate(props: IEventProps): void {
  const { bot, payloads, config, guild } = props;

  bot.on(ClientEvent.voiceStateUpdate, (oldVoiceState, newVoiceState) => {
    if (newVoiceState.channel && !oldVoiceState.channel) {
      voiceConnect({ voiceState: newVoiceState, payloads, config, guild });
    } else if (oldVoiceState.channel && !newVoiceState.channel) {
      voiceDisconnect({ voiceState: newVoiceState, payloads, config, guild });
    } else {
      const voiceStateEvent = difference(newVoiceState, oldVoiceState) as VoiceState;
      const eventsTriggered = Object.keys(voiceStateEvent)[0];
      switch (eventsTriggered) {
        case 'selfMute':
          if (voiceStateEvent[eventsTriggered]) {
            mute({ voiceState: newVoiceState, payloads, config, guild });
          }
          break;
        default:
          break;
      }
    }
  });
}
