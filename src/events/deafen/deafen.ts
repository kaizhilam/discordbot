import { Guild, VoiceState } from 'discord.js';
import { actionManager } from '../../actions';
import { Event, IConfig, IPayload } from '../../utils';

interface IDeafen {
  voiceState: VoiceState;
  payloads: IPayload[];
  config: IConfig;
  guild: Guild;
}

export function deafen(props: IDeafen): void {
  const { voiceState, payloads, config, guild } = props;
  const events = payloads.filter((payload) => payload.event === Event.deafen);
  events.forEach((event) => {
    const { args = {}, actions } = event;
    const { member = false } = args;
    if (!member || member === voiceState.member.user.tag) {
      actionManager({ actions, config, guild, event });
    }
  });
}
