import { IActionArg, IConfig } from '../../utils';
import { Guild } from 'discord.js';

export interface IActionProps {
  args: IActionArg;
  guild: Guild;
  config?: IConfig;
}
