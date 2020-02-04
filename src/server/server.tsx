import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import * as proxy from "http-proxy-middleware";
import ClientApp from "../client/clientApp";
import ServerConfig from "./serverConfig";

const serverConfig: ServerConfig = new ServerConfig();
console.log(serverConfig.getConfig().appName);
console.log(serverConfig.getConfig().appDesc);

const clientApp: ClientApp = new ClientApp();

const app = express();
const PORT = process.env.PORT || serverConfig.getConfig().port;

const options = {
    changeOrigin: true,
    pathRewrite: {
        "^/api/": "/",
    },
    target: serverConfig.getConfig().apiTargetHost,
};

const proxyService = proxy(options);
app.use("/api", proxyService);

const allowCrossDomain = (req: any, res: any, next: () => void) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
};

app.use(bodyParser.json());
app.use(allowCrossDomain);

app.get("*", (req: Request, res: Response): void => {
    res.send(clientApp.getServerRenderPage(req));
});

app.listen(PORT, () => {
    console.log(`Node App Running on port ${PORT}`);
});
