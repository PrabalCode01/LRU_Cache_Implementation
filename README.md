# Cache Implementation

## Expiry Policy

### Chosen Policy: LRU (Least Recently Used)

#### Rationale:
The LRU policy was chosen because it efficiently manages the cache by evicting the least recently accessed items first. This is particularly useful in scenarios where the most recently accessed items are likely to be accessed again soon, thus optimizing the cache hit rate. The LRU policy is implemented using a `Map` object, which maintains the order of insertion and allows for efficient updates and deletions.

## How to Use the Cache

### Initialization:
To create a cache instance, you need to specify the maximum capacity and optionally the expiry policy. By default, the LRU policy is used.

```javascript
import { Cache } from './cache.js';

// Create a cache with a maximum capacity of 5 items using the default LRU policy
const cache = new Cache(5);

// Create a cache with a maximum capacity of 5 items using the FIFO policy
const fifoCache = new Cache(5, 'FIFO');
```

### Adding Items:
To add items to the cache, use the [`put`] method. If the item already exists, it will be updated.

```javascript
cache.put('key1', 'value1');
```

### Retrieving Items:
To retrieve items from the cache, use the [`get`] method.

```javascript
const value = cache.get('key1');
```

### Expiry Policy:
- **LRU (Least Recently Used)**: When the cache reaches its maximum capacity, the least recently accessed item will be evicted.
- **FIFO (First In, First Out)**: When the cache reaches its maximum capacity, the oldest item (first inserted) will be evicted.

## Running the Tests

### Prerequisites:
Ensure you have Node.js and npm installed.

### Steps:
1. Install the dependencies:
    ```sh
    npm install
    ```

2. Run the tests:
    ```sh
    npm test
    ```

This will execute the test suite and display the results in the terminal.

## Conclusion
This cache implementation provides a flexible and efficient way to manage cached data with support for both LRU and FIFO expiry policies. The default LRU policy is suitable for most use cases where recent access patterns are important.
```
