import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import Routes from './Routes';
import ClientHtml from './ClientHtml';

interface Context {
    url: string;
    tag: string;
    status: number;
}

export class ClientApp {

    constructor() {
    }

    getServerRenderPage(request: any): string {
        const context = {} as Context;
        context.tag = "Dashboard Mobile Server";

        const body = renderToString(
            <StaticRouter location={request.url} context={context}>
                <Routes />
            </StaticRouter>
        );

        const helmet = Helmet.renderStatic();

        return ClientHtml({
            body,
            helmet
        });
    }
}

export default ClientApp;
