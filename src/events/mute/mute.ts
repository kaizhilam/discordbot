import { Event, IConfig, IPayload } from '../../utils';
import { Guild, VoiceState } from 'discord.js';
import { actionManager } from '../../actions';

interface IMute {
  voiceState: VoiceState;
  payloads: IPayload[];
  config: IConfig;
  guild: Guild;
}

export function mute(props: IMute): void {
  const { voiceState, payloads, config, guild } = props;

  const events = payloads.filter((payloads) => payloads.event === Event.mute);
  events.forEach((event) => {
    const { args, actions } = event;
    const { member } = args;
    if (member === voiceState.member.user.tag) {
      actionManager({ actions, config, guild });
    }
  });
}
