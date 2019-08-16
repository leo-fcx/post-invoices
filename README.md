# post-invoices

## The problem

Post is the biggest mail-company in Switzerland, they deliver physical and electronic messages overall the country. In the late 90s, the Swiss government has defined that all invoices should be sent to your inbox via email, this measure was created to reduce the amount of paper used for printing invoices and increase the overall ranking for environment-friendly countries in the EU.

But such law has created a problem for Post, early on they have decided a set of synchronous APIs for all businesses to send their invoices, and such decision has proven to be unefficient, as their consumers-base is growing, the services are getting slower and slower. Over time they have used bigger servers and load balancers to reduce latency, but the problem persist and pretty soon will be evident that they can't keep up with the load.

They can't stop the services from working nor change their APIs since they are regulated by the government, what approach would you suggest to improve Post's situation?

## Diagram for the suggested solution

Considering the main requirement, we should not be changing the Application Public Interface (API) from stablished and running solution. So, the changes suggested are going to be applied at the layer where the Backend communicates with other resources like DB or other that provoke the response time delays. For this code that layer are the Controllers which are in charge of saving the values to the DB.

![alt text](https://raw.githubusercontent.com/leo-fcx/post-invoices/master/images/diagram.png)


## Setup

Clone the repo code and install the dependencies: `npm install`

## How to run it?

To run the scenario where there are delays in respose which could be directly proportional to the number of concurrent request, run: `npm run start`

To run the scenario where we apply the solution using a RabbitMQ instance, run: `USER=<username> PASS=<password> npm run start:optimized`. Where `username` and `password` are the credentials to connect to the RabbitMQ instance.

Once you have any of above servers running you can proceed testing it by tunning: `node client.js 200`. This command simulates concurrent requests to the server where for this example `200` is the number of requests to send. 

## Available end-points

For your testing, you may want to use following end-points to confirm that all post are going through the API to the DB resource.

> GET http://localhost:5000/api/v1/invoices

> POST http://localhost:5000/api/v1/invoices
> payload
>  {
>    buyserId: 123,
>    storeId: 234,
>    details: 'Some details text',
>    amount: 456
>  }
