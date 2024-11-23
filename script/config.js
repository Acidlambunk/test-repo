window._config = {
    cognito: {
        userPoolId: 'ap-southeast-2_JhLU20MH6', // Your Cognito User Pool ID
        userPoolClientId: '5hfk774ivoehqg4pdru07te5pq', // Your Cognito App Client ID
        region: 'ap-southeast-2' // The AWS Region of your Cognito User Pool
    },
    api: {
        invokeUrl: '' // Add your API Gateway invoke URL here if applicable
    },
    oauth: {
        issuerUrl: 'https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_1oeM4jDQM', // Cognito Issuer URL
        clientId: '7po0inbvaaa334akkjdoqes39d', // OAuth Client ID for your App Client
        clientSecret: '151rbfrsuvvl02cphqvhmutehfour99u2spg7pnh27jltsr2qeuqlient secret', // OAuth Client Secret (if applicable)
        redirectUris: ['https://d84l1y8p4kdic.cloudfront.net'], // Redirect URI(s) for your app
        responseType: 'code' // Response type for Authorization Code Flow
    }
};
