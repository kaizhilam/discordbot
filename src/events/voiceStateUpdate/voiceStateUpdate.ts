import { difference } from '../../utils';
import { ClientEvent, IEventProps, voiceConnect, voiceDisconnect } from '..';

export function voiceStateUpdate(props: IEventProps): void {
  const { bot, payloads, config, guild } = props;

  bot.on(ClientEvent.voiceStateUpdate, (oldVoiceState, newVoiceState) => {
    if (newVoiceState.channel && !oldVoiceState.channel) {
      voiceConnect({ voiceState: newVoiceState, payloads, config, guild });
    } else if (oldVoiceState.channel && !newVoiceState.channel) {
      voiceDisconnect({ voiceState: newVoiceState, payloads, config, guild });
    } /* else {
      const voiceStateEvent = difference(newVoiceState, oldVoiceState) as VoiceState;
      const member = newVoiceState.member;
      let eventsTriggered = Object.keys(voiceStateEvent);

      // Filter deafen
      if (eventsTriggered.includes('selfDeaf')) {
        eventsTriggered = eventsTriggered.filter((e) => e !== 'selfMute');
      }

      const event = eventsTriggered[0];
      switch (event) {
        case 'selfMute':
          break;
        default:
          break;
      }
      console.log(`${member.user.tag} triggered ${event} to ${voiceStateEvent[event]}.`);
    }
    */
  });
}
