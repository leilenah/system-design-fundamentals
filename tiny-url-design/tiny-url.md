# [Designing a URL Shortening service like TinyURL](https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR)

## Overview

1. System Description
2. System Goals & Requirements
3. Capacity Estimation and Constraints
4. System APIs
5. Database Design
6. Basic System Design and Algorithm
7. Data Partitioning and Replication
8. Cache
9. Load Balancer
10. Purging DP Cleanup
11. Telemetry
12. Security and Permissions

---

## Tips
- Always clarify requirements before jumping in
- Determine scope of the system
- Once requirements are finalized, design the system APIs
- System APIs should state system expectations
- Design the DB schema early on to help with data partitioning

---

## Requirements and Goals of the System

### Functional Requirements:

Given a URL, our service should generate a shorter and unique alias of it. This is called a short link. This link should be short enough to be easily copied and pasted into applications.

When users access a short link, our service should redirect them to the original link.

Users should optionally be able to pick a custom short link for their URL.

Links will expire after a standard default timespan. Users should be able to specify the expiration time.

### Non-Functional Requirements:

The system should be highly available. This is required because, if our service is down, all the URL redirections will start failing.

URL redirection should happen in real-time with minimal latency.

Shortened links should not be guessable (not predictable).

### Extended Requirements:

Analytics; e.g., how many times a redirection happened?

Our service should also be accessible through REST APIs by other services.

---

## Capacity Estimation and Constraints

1. 500M ner URL shortenings per month
2. 100:1 read/write ratio -- for every 100 read requests we will have 1 write request (?)
3. ~200 URL queries per second
4. 20k redirects per second
5. Store every URL shortening request for 5 years
6. Store about 30 billion URLS over 5 year period
7. Each stored object approx. 500 bytes
8. We will need 15 TB storage (for 5 years)
9. Write requests (incoming data): 100 KB per second
10. Read Requests (outgoing data): ~10 MB per second
11. ~1.7 billion requests per day
12. 170 GB memory needed to cache requests (max -- there will be some dups)

---

## System APIs

### URL Creation Api

createURL(api_dev_key, original_url, custom_alias=None, user_name=None, expire_date=None)

- Params: (5)
- Returns: custom URL

deleteURL(api_dev_key, url_keu)

- Params: (2)
- Returns: 'URL Removed' Message upon success

---

## Database Design

### Database Schemas

![alt tag](https://www.educative.io/api/collection/5668639101419520/5649050225344512/page/5668600916475904/image/5663052624035840.png "Tiny URL DB schema")

### Database Recommendataion

- We should use a NoSQL key-value store since the DB is non-relational
- DynamoDB, Cassandra, Riak
- NoSQL is easier to scale

#### SQL vs NoSQL

Source: [SQL vs. NoSQL](https://www.educative.io/courses/grokking-the-system-design-interview/YQlK1mDPgpK)


##### SQL
- MySQL, Postgres, Oracle, MS SQL Server, SQLite, Maria DB
- relational DB
- structured with pre-defined schemas
- Stores data in rows and columns
- Each row contains all of the information about one entity
- Each column and row must be filled

###### When to use SQL
- Your data is structured and unchanging
- Your business is not experiencing massive growth that would require more servers
- You're only working with dta that is consustent (you don't need to support a variety of data types)
- When you need ACID (Atomicity, Consistency, Isolation, Durability) compliance
- When you need transactions / interactions with the DB to be exactly prescribed

##### NoSQL
- Mongo DB, Cassandra, Redis, Dynamo, Voldemort, Couch DB, HBase
- non-relational DB
- unstructured, distributed
- dynamic schemas
- types
  - Key-value stores: Data is stored in an array of key-value pairs. Redis, Voldemort and Dynamo.
  - Document Databases: Data is stored in documents, which are grouped in collections. MongoDB, Couch DB
  - Wide-Column Databases: Instead of tables in columnar databases, we have column families. Best for large datasets. Cassandra, HBase.
  - Graph databases: used to store data whose relations. Neo4J and InfiniteGraph

###### When to use NoSQL
- Storing large volumes of data
- Data has little to no structure
- No limits on the types of data we can store together
- We can add new types as the need changes
- You want to make the most of cloud computing and storage (this is complicated w/ SQL databases)
- You can easily scale your data up and down across multiple data centers
- Rapid development (schemas don't need to be defined ahead of time)

---

## Basic System Design and Algorithm

Clients -> Application Server -> Key Generation Service
|
v
Database
|
v
Key Database

## Data Partitioning and Replication

- Range-based partioning
  - store data based on range (e.g. by first letter of a hash)
  - Issue: this can lead to unbalanced DB servers
- Hash-based partitioning
  - take a hash of the object we are storing
  - calculate which partition to used based on the hash
  - data will be stored randomly

---

## Cache

- E.g. memcache
- We can cache URLs that are frequently accessed
- App servers can check the cache before hitting the backend servers
- You need to determine how much you want to put in your cache -- modern dat servers can have 256GB memory
- Need to come up with a cache eviction polity (e.g. LRU -- last recently used)

---

## Load Balancer

- We can add a load balancer in three places
  - Between clients and application servers
  - Between application servers and database servers
  - Between application servers and cahe servers

- Round Robin LB
  - distributes incoming requests equally among backend servers
  - simple to implement
  - does not introduce any overhead
  - if a server is dead, LB will take it out of the rotation
  - Issue: server load is not take into consideration -- LB will continue to send new requests to the server
  - Issue Resolution: periodically query the backend server about its load

### Build-in Load Balancers

- AWS (Amazon Web Services) has Elastic Load Balancing Service
  - Application Load Balancer: load balancing for HTTP and HTTPS traffic
  - Network Load Balancer: for TCP, UDP and TLS where extreme performance is required
  - Classic Load Balancer: Basic load balancing across multiple Amazon EC2 instances (request level and connection level)
- Google cloud has built-in load balancing
  - At that point you are just loading configs

---

## Purging or DB Cleanup

- You can slowly remove expired links and do a lazy cleanup
- We can wait for a user to try to access an expired link, then we can delete the link at that time
- We can also build a separate cleanup service to remove expired links (run this service when user traffic is low)
- Add key back to the DB for re-use after deletion

---

## Telemetry

- Telemetry is the process of recording and transmitting the readings of an instrument
- You need to decide what will be worth tracking
- E.g. country of the visitor, date and time of access, web page that refers the click
- browser or platform where the page was accessed

---

## Security and Permissions

- We need to think about weather or not users create private UTLs or allow a particular set of users to access a URL
- We can store permission levels for each URL (public/private)
