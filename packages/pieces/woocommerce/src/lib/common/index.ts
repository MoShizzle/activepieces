import { Property } from "@activepieces/pieces-framework";

export const WooCommon = {
    baseUrl: '',

    authentication: Property.OAuth2({
        displayName: 'Authentication',
        required: true,
        authUrl: '',
        tokenUrl: '',
        scope: []
    }),
    
}