import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEvent } from "aws-lambda";

import Axios from "axios";

export const handler = async (event: APIGatewayProxyEvent) => {

    try {
        /**
         * The url will have some params and it will be like ourUrl/gameDeals?currncy=pkr
         * Destructuring the <event> varaibale to get param value passed in url
         * If no param is passed, <queryStringParameters> will be null so it will be an empty object
         */

        const { queryStringParameters = {} } = event
        const { currency } = queryStringParameters

        if(!currency) {
            return formatJSONResponse({
                statusCode: 400,
                data: {
                    message: "Missing currency query parameter"
                }
            })
        }

        const deals = await Axios.get(
            "https://www.cheapshark.com/api/1.0/deals?upperPrice=15&pageSize=5"
        )

        const currencyData = await Axios.get(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${currency}.json`
        )

        const currencyConversionRate = currencyData.data[currency]

        const convertedPriceDeals = deals.data.map((deal) => {
            // Destructuring deal
            const {
                title,
                storeID,
                salePrice,
                normalPrice,
                savings,
                steamRatingPercent,
                releaseDate,
            } = deal

            return {
                title,
                storeID,
                steamRatingPercent,
                salePrice: salePrice * currencyConversionRate,
                normalPrice: normalPrice * currencyConversionRate,
                savingsPercent: savings,
                releaseDate: new Date(releaseDate * 1000).toDateString()       // In JS, time is in millisecs
            }
        })

        return formatJSONResponse({
            data: {
                message: convertedPriceDeals
            }
        })
    } catch (error) {
        console.log('Error', error)
        return formatJSONResponse({
            statusCode: 502,
            data: error.message,
        })
    }
}