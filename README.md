# it's domDom guys

## Setup Guide for Shopify Function "2hr-hideship"

1. #### Execute the following GraphQL query to retrieve the ID of the "2hr-hideship" function. The resulting ID will look similar to `1e44a349-b921-426b-9f97-56c394070b42`.

   ```graphql
   query {
     shopifyFunctions(first: 20, apiType: "delivery_customization") {
       nodes {
         title
         id
       }
     }
   }
   ```

2. #### Run the following GraphQL `deliveryCustomizationCreate` mutation to connect the function with your store. Replace the `functionId` in this query with the ID retrieved in step 1. After a successful request, note down the `deliveryCustomization.id`, which will look like `gid://shopify/DeliveryCustomization/9797719`.

   ```graphql
   mutation deliveryCustomizationCreate {
     deliveryCustomizationCreate(deliveryCustomization: { functionId: "1e44a349-b921-426b-9f97-56c394070b42", title: "Enabled function", enabled: true }) {
       deliveryCustomization {
         id
       }
       userErrors {
         message
       }
     }
   }
   ```

3. #### Prepare a JSON object containing configuration settings to control visibility and show/hide the 2-hour delivery option based on time, date, and zip code.

   ```json
   {
     "deliveryStart": "08:00:00",
     "deliveryEnd": "23:00:00",
     "unavailableFrom": "2023-01-01T00:00:00",
     "unavailableTo": "2023-12-31T23:59:59",
     "enabledPinCodes": "5000|5006|5007|5008|5009|5010"
   }

   //deliveryStart: Time in HH:MM:SS (24-hour format) indicating when 2-hour delivery becomes available.
   //deliveryEnd: Time in HH:MM:SS (24-hour format) indicating when 2-hour delivery ends.
   //unavailableFrom: Date and time in YYYY-MM-DDTHH:MM:SS format indicating when 2-hour delivery is no longer available.
   //unavailableFrom: Date and time in YYYY-MM-DDTHH:MM:SS format indicating when 2-hour delivery becomes available again.
   //enabledPinCodes: Pipe-separated (|) list of zip codes where 2-hour delivery is available.
   ```

4. #### Convert your JSON configuration into a string format. Use a tool like [Dadroit JSON to String Converter](https://dadroit.com/json-to-string/) to obtain the string representation. For example, the JSON:

   ````json
   {
     "deliveryStart": "08:00:00",
     "deliveryEnd": "23:00:00",
     "unavailableFrom": "2024-01-01T00:00:00",
     "unavailableTo": "2024-12-31T23:59:59",
     "enabledPinCodes": "5000|5006|5007|5008|5009|5010"
   }
    ```
   ````

   > will be converted to:
   >
   > "{\n \"deliveryStart\": \"08:00:00\", \n \"deliveryEnd\": \"23:00:00\",\n \"unavailableFrom\": \"2023-01-01T00:00:00\",\n \"unavailableTo\": \"2023-12-31T23:59:59\",\n \"enabledPinCodes\": \"5000|5006|5007|5008|5009|5010\" \n}"

5. #### Set up the configuration metafield using the `deliveryCustomization.id` obtained in step 2. Replace `ownerId` with the `deliveryCustomization.id` from step 2 and use the string value from step 4.

   ```graphql
   mutation {
     metafieldsSet(
       metafields: [
         {
           namespace: "2hr-hideship"
           key: "config"
           ownerId: "gid://shopify/DeliveryCustomization/9732183"
           type: "json"
           value: "{\n  \"deliveryStart\": \"01:00:00\",\n  \"deliveryEnd\": \"23:00:00\",\n  \"unavailableFrom\": \"2023-01-01T00:00:00\",\n  \"unavailableTo\": \"2023-12-31T23:59:59\",\n  \"enabledPinCodes\": \"303104|5000|5006|5007|3977|3978\"\n}"
         }
       ]
     ) {
       metafields {
         id
       }
       userErrors {
         message
       }
     }
   }
   ```

6. ### Done
7. ### To update the configuration settings in the future, simply run the below given query to retrive the `deliveryCustomization.id` of the function which has `2hr-hideship` functionTitle.

   ```graphql
   query deliveryCustomizations {
     deliveryCustomizations(first: 10) {
       nodes {
         id
         shopifyFunction {
           functionTitle: title
         }
       }
     }
   }
   ```

8. ### Then repeat step 3,4,5 and on the step no. 5 use the `deliveryCustomization.id` which you got from step 7 to update/set the metafield config value.
