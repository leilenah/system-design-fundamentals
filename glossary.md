## Basic Considerations
1. Architectural pieces that can be used
2. How each architectural piece works with the other pieces
3. Optimal way to use the pieces -- tradeoffs

---

### Distribured Systems

#### Scalability
- Ability for system to grow as demand increases.
- Horizontal scaling: add more servers
- Vertical scaling: add more power to your server (CPU, RAM, Storage, etc.)

#### Reliability
- The probability that a system will fail in a given period.
- Distributed systems are reliable if they can keep delivering services even though one or multiple hardware / software components fail.

#### Efficiency

#### Serviceability or Manageability

---

### Load Balancing

---

### Caching

#### Overview

- Caching enables you to maximize your resources
- Locality of reference principle: Recently requested data is likely to be requested again
- Cache is like short-term memory
- Caches are faster than the original data source
- Caches contain the most recently accessed items

#### Application Server Cache

- You can place a cache directly on a request layer node
- This enables the local storage of response data
- Each time a request is made to the service, the node will quickly return local cached data if it exists

#### Content Distribution Network (CDN)

- Kind of cache used for sites leveraging large amounts of static media
- CDNs hold static assets
- When requesting an asset from the CDN, CDN is checked locally first; if the asset is not found locally, the CDN checks the backend servers.
- After checking the backend servers, CDN will cache the asset locally.
- Usually CDNs are only needed if the system you are building is quite large and calls for it.

#### Cache Invalidation

- Need to keep the cache valid
- If data that is in the cache is modified in the DB, it needs to be invalidated in the cache
- Write-through cache: write directly to the cache and the db
- Write-around cache: skip the cache and write directly to the db
- Write-back cache: write directly to the cache, and update the main db under specified conditions

#### Cache Eviction Policies

- First in First Out (FIFO): Cache evicts the first block accessed
- Last in First Out (LIFO): Cache evicts the last block accessed
- Least Recently Used (LRU): Disgards the least recently used item first
- Most Recently Used (MRU): Disgards the most recently used item first
- Least Frequently Used (LFU): Discards the least frequently used items
- Random Replacement (RR): Randomly discards a candidate

#### HTTP Caching
Source: [HTTP Caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)

- Every browser ships with and implementation of an HTTP cache
- You just need to ensure that each server response provides the correct HTTP header directives
- These directives instruct the broswer on when and for how long the browser can cache the response
  - ETag Header: validation token
  - Cache-Control: who can cache the reponse and under which conditions
- Locally cached responses are used until the resource expires
- Each application needs to define its own cache hierarchy for optimal performance

#### Browser Cache
Source: [What is a browser cache, and why is it important?](https://www.bigcommerce.com/ecommerce-answers/what-browser-cache-and-why-it-important/)

- Assets stored by browser cache
  - Images
  - HTML
  - CSS
  - JavaScript
- Browsers typically cache static assets (assets that do not change from visit to visit)
- What to cache and for how long is determined by the website
- The main pitfall of local caching is that if an asset is swapped, you may have to clear your cache before being able to see the new asset.

---

### Data Partitioning

---

### Indexes

---

### Proxies

---

### Redundancy and Replication

---

### SQL vs NoSQL

---

### CAP Theorem

---

### Consistent Hashing

---

### Long-Polling vs WebSockets vs Server-Sent Events

#### HTTP Request

1. Client sends a request to a server
2. Server calculates the request
3. Server sends a response to the client

#### AJAX Polling

- Client repeatedly polls (or requests) a server for data
- Requests are sent at regular intervals (e.g. 0.5 seconds)
- Server calculates the response and sends it back

#### HTTP Long-Polling

- Aka "Hanging Get"
- Instead of sending back an empty response, the request "hangs" until the server has something to send back to the client
- Once the client recieves the request, typically another request is sent out

#### WebSockets

- Creates a bi-drectional (full duplex) communication channel over a single TCP collection
- TCP: Transmission Control Prorocol
- Enables communication between client and server with lower overheads
- Facilitates real-time data transfer from the server
- Standardizes the conversation between client and server
- Open conversation

#### Server-Sent Events (SSEs)

- Client establishes a persistent long-term connection to the server
- Server uses this connection to send data to the client
- This is a one-directional connection
- Server can send to client, but client cannot send to server
