import { Guild, VoiceState } from 'discord.js';
import { actionManager } from '../../actions';
import { Event, IConfig, IPayload } from '../../utils';

interface IVoiceConnect {
  voiceState: VoiceState;
  payloads: IPayload[];
  config: IConfig;
  guild: Guild;
}

export function voiceConnect(props: IVoiceConnect): void {
  const { payloads, voiceState, config, guild } = props;

  const events = payloads.filter((payload) => payload.event === Event.voiceConnect);

  events.forEach((event) => {
    const { args, actions } = event;
    const { member } = args;
    if (member === voiceState.member.user.tag) {
      actionManager({ actions, config, guild, event });
    }
  });
}
