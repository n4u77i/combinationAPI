# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

### Using Serverless

- Run `sls deploy` to deploy this stack to AWS

## Test your service

This template contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/gameDeals` route with `GET` method. The body structure is tested by API Gateway against `src/functions/combinationAPI/index.ts`.

- requesting any other path than `/gameDeals` with any other method than `GET` will result in API Gateway returning a `403` HTTP error code
- sending a `GET` request to `/gameDeals` with a payload **not** containing a string property named `currency` will result in API Gateway returning a `400` HTTP error code
- sending a `GET` request to `/gameDeals` with a payload containing a string property named `currency` will result in API Gateway returning a `200` HTTP status code with a message saluting the provided name and the detailed event processed by the lambda

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
????????? src
???   ????????? functions               # Lambda configuration and source code folder
???   ???   ????????? combinationAPI
???   ???       ????????? index.ts        # Export of handler for lambda function
???   ????????? libs                    
???       ????????? apiGateway.ts       # API Gateway specific helper functions
????????? serverless
???   ????????? functions.ts            # Handler for lambda function
????????? package.json
????????? serverless.ts               # Serverless service file
????????? tsconfig.json               # Typescript compiler configuration
????????? tsconfig.paths.json         # Typescript paths
????????? webpack.config.js           # Webpack configuration
```