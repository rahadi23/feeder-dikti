import { Agent } from "http";

export type FeederOptions = {
  host: string;
  username: string;
  password: string;
  endpoint?: string;
  agent?: Agent | ((parsedUrl: URL) => Agent);
};
