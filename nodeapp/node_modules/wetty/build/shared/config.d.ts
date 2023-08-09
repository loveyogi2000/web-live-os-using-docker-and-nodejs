import type { Arguments } from 'yargs';
import type { Config } from './interfaces';
export declare function loadConfigFile(filepath?: string): Promise<Config>;
export declare function mergeCliConf(opts: Arguments, config: Config): Config;
