import { Event } from '.';

export interface IPayloadEventArg {
  ignoreCase?: boolean;
  message?: string;
  member?: string;
}
export interface IPayloadActionArg {
  message?: string;
  member?: string;
  channel?: string;
}
export interface IPayloadAction {
  name?: string;
  action: string;
  args: IPayloadActionArg;
}
export interface IPayload {
  name?: string;
  event: Event;
  args?: IPayloadEventArg;
  actions: IPayloadAction[];
}
export interface IConfig {
  token: string;
  guildId: string;
  schemaChannelId: string;
}
