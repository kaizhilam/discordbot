import { Client, Guild, VoiceState } from 'discord.js';
import { IPayload, Event as PayloadEvent, IConfig, difference } from '../../utils';
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

  const allVoiceChannel = payloads.filter(
    (payload) => payload.event === PayloadEvent.voiceConnect || payload.event === PayloadEvent.voiceDisconnect,
  );
  const onVoiceChannelConnect = allVoiceChannel.filter((payload) => payload.event === PayloadEvent.voiceConnect);
  const onVoiceChannelDisconnect = allVoiceChannel.filter((payload) => payload.event === PayloadEvent.voiceDisconnect);

  const handleJoinLeave = (state: VoiceState, voiceStateArr) => {
    voiceStateArr.forEach((event) => {
      const { args, actions } = event;
      const { member } = args;
      if (member === state.member.user.tag) {
        actionManager({ actions, config, guild });
      }
    });
  };

  bot.on(Event.voiceStateUpdate, (oldVoiceState, newVoiceState) => {
    if (newVoiceState.channel && !oldVoiceState.channel) {
      // Voice channel join
      handleJoinLeave(newVoiceState, onVoiceChannelConnect);
    } else if (oldVoiceState.channel && !newVoiceState.channel) {
      // Voice channel left
      handleJoinLeave(oldVoiceState, onVoiceChannelDisconnect);
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
