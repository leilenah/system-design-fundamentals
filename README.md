# system-design-fundamentals

## [SDI Interview Overview](https://www.educative.io/courses/grokking-the-system-design-interview/B8nMkqBWONo)

### STEP 1: Requirements Clarifications
- Always get clarification on the scope of the design
- Clarify what is and is not needed
- If there is a user-facing component, clarify what the user can / cannot do

### STEP 2: System Interface Definition
- Confirm what APIs will be needed

### STEP 3: Back-of-the-enveloper Estmation
- Confirm how widely the application will have to scale
- This will help when making choices about storage, partitioning, load balancing and caching

### STEP 4: Defining Data Model
- Design your tables and how they interact together
- This will help when choosing the DB you will need

### STEP 5: High-level Design
- Draw a high-level block diagram
- E.g. Clients -> Load Balancer -> Servers
![alt text](https://www.educative.io/api/collection/5668639101419520/5649050225344512/page/5684049913839616/image/5127881690710016.png "System Design Diagram")