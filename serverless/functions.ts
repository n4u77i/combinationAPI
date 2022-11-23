import type { AWS } from '@serverless/typescript';

const functions: AWS["functions"] = {
    // Any function name
    combinationAPI: {
        // Lambda function path
        handler: 'src/functions/combinationAPI/index.handler',

        // Event to trigger lambda function
        events: [
            {
                httpApi: {
                    path: '/gameDeals',
                    method: 'get'
                }
            }
        ]
    }
}

export default functions