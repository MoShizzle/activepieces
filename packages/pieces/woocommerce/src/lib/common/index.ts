import { Property } from "@activepieces/pieces-framework";
import { HttpRequest, HttpMethod, httpClient, AuthenticationType } from "@activepieces/pieces-common";

export const wooCommon = {
    authentication: Property.CustomAuth({
        displayName: 'Authentication',
        required: true,
        props: {
            baseUrl: Property.ShortText({
                displayName: 'Base URL',
                description: 'The base URL of your app without trailing slash (e.g https://mystore.com, not https://mystore.com/)',
                required: true,
            }),
            consumerKey: Property.ShortText({
                displayName: 'Consumer Key',
                description: 'The consumer key generated from your app',
                required: true,
            }),
            consumerSecret: Property.SecretText({
                displayName: 'Consumer Secret',
                description: 'The consumer secret generated from your app',
                required: true,
            })
        }
    }),

    async subscribeWebhook(webhookUrl: string, type: string, authentication: any) {
        const onCreate = await httpClient.sendRequest({
            url: `${authentication.baseUrl}/wp-json/wc/v3/webhooks`,
            method: HttpMethod.POST,
            body: {
                name: `${type} created`,
                topic: `${type.toLowerCase()}.created`,
                delivery_url: webhookUrl
            },
            authentication: {
                type: AuthenticationType.BASIC,
                username: authentication.consumerKey,
                password: authentication.consumerSecret
            }
        });
        console.log('onCreate')
        console.log(onCreate.body);

        return onCreate;
    },

    async unsubscribeWebhook(webhookIds: string[]) {
        //
    }
}