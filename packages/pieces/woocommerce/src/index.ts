import { createPiece } from "@activepieces/pieces-framework";

import { customer } from "./lib/triggers/customer";

export const woocommerce = createPiece({
    displayName: "WooCommerce",
    logoUrl: "https://cdn.activepieces.com/pieces/woocommerce.png",
    authors: ['MoShizzle'],
    actions: [],
    triggers: [customer],
});