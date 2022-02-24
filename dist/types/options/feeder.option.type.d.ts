/// <reference types="node" />
import { Agent } from "http";
export declare type FeederOptions = {
    host: string;
    username: string;
    password: string;
    endpoint?: string;
    agent?: Agent | ((parsedUrl: URL) => Agent);
};
