const _ = require('lodash');
import {Config} from './model'

export interface IHash {
    [details: string] : any;
}

class ServerConfig {

    envConfig: Config;

    constructor() {
        const config = require('./../../conf/server.config.json');
        const defaultConfig = config.development;
        const environment = process.env.NODE_ENV || 'development';
        const environmentConfig = config[environment];
        this.envConfig = _.merge(defaultConfig, environmentConfig);
    }

    getConfig(): Config {
        return this.envConfig;
    }
}

export default ServerConfig;
