## SCORE BOARD MODULE

### Overview

The score board module is a component of our application that manages and displays scores for various activities.

---

### Functional requirements

1. The client dispatches an API call to notify the backend service that the user has completed an action
2. The client can view top 10 users with their score in real-time
3. Only allow logged-in users to complete an action

---

### Flow of execution

[Please check this diagram](https://excalidraw.com/#json=F0hC4ZYQokj5yGMKJVpDR,akgvCOH6PLiZ7LLToe6t2g)

*Or use the image in the same folder if the link doesn't work*

---

### API

#### Complete an action

* Request

```plaintext
action/complete
method: POST
authorization: Bearer <JWT>
```
    
* Response

```plaintext
status-code: 200

{
    user_id: 1,
    name: "Toni",
    score: 100,
    rank: 15
}
```
    
#### Get top 10 users

* Request

```plaintext
leaderboard?top=10
method: GET
authorization: Bearer <JWT>
```
    
* Response
    
```plaintext
status-code: 200

{
    total: 10,
    page: 1,
    data: [
        {
            user_id: 1,
            name: "Toni",
            score: 100,
            rank: 1
        },
        ...
    ]
}
```
    
---
        
### Some ways to improve performance and stability

1. Use Sorted-set data type in Redis to easily maintain score board
2. Prevent cache breakdown: don't set expire time of the score board in cache
3. Prevent cache crash and read data directly from database: use high availabilty cache cluster and implement circuit breaker
4. Sync to database: split data into smaller parts and avoid sync all data at once
5. Utilize shadow banning to prevent malicious users