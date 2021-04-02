import { IActionArg, IConfig, IPayload } from '../../utils';
import { Guild } from 'discord.js';

export interface IActionProps {
  args: IActionArg;
  guild: Guild;
  config?: IConfig;
  event: IPayload;
}
