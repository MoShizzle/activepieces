import { TriggerStrategy, createTrigger } from "@activepieces/pieces-framework";
import { wooCommon } from "../common";

export const customer = createTrigger({
    name: 'customer',
    displayName: 'Customer',
    description: 'Triggers when any customer is created, updated or deleted.',
    type: TriggerStrategy.WEBHOOK,
    sampleData: {},
    props: {
        authentication: wooCommon.authentication
    },
    //Create the webhook in WooCommerce and save the webhook ID in store for disable behavior
    async onEnable(context) {
        const webhookIds = await wooCommon.subscribeWebhook(context.webhookUrl, 'Customer', context.propsValue.authentication);
        console.log('webhookIds')
        console.log(webhookIds)

        await context.store?.put('_customer_trigger', {
            webhookIds: webhookIds
        });
    },
    //Delete the webhook from WooCommerce
    async onDisable(context) {
        const response = await context.store?.get('_customer_trigger') as { webhookIds: string[] };

        if (response !== null && response !== undefined) {
            await wooCommon.unsubscribeWebhook(response.webhookIds);
        }
    },
    //Return new customer
    async run(context) {
        return [context.payload.body];
    }
})