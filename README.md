# post-invoices

Post is the biggest mail-company in Switzerland, they deliver physical and electronic messages overall the country. In the late 90s, the Swiss government has defined that all invoices should be sent to your inbox via email, this measure was created to reduce the amount of paper used for printing invoices and increase the overall ranking for environment-friendly countries in the EU.

But such law has created a problem for Post, early on they have decided a set of synchronous APIs for all businesses to send their invoices, and such decision has proven to be unefficient, as their consumers-base is growing, the services are getting slower and slower. Over time they have used bigger servers and load balancers to reduce latency, but the problem persist and pretty soon will be evident that they can't keep up with the load.

They can't stop the services from working nor change their APIs since they are regulated by the government, what approach would you suggest to improve Post's situation?

# Diagram for the suggested solution

![alt text](https://raw.githubusercontent.com/leo-fcx/post-invoices/master/images/diagram.png)

