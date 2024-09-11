export class Cache {
    constructor(maxCapacity, policy = 'LRU') {
        this.maxCapacity = maxCapacity;

        // using Map for storing (key,pair) and also the LRU order.
        this.cache = new Map(); 
        this.policy = policy;

        if (this.policy === 'FIFO') {
            // Array to track FIFO order since get on FIFO will not eviction order.
            this.order = []; 
        }
    }

    put(key, value) {
        if (this.cache.has(key)) {
            // Update the key with the new value 
            this.cache.set(key, value);
            if (this.policy === 'LRU') {
                // Move item to end of Map to indicate recent usage
                this.cache.delete(key);
                this.cache.set(key, value);
            }
        } else {
            if (this.cache.size >= this.maxCapacity) {
                // evict the element in accordance to its policy
                this.evict();
            }

            this.cache.set(key, value);

            if (this.policy === 'FIFO') {
                this.order.push(key); // Track order for FIFO
            }
        }
    }

    get(key) {
        if (this.cache.has(key)) {
            if (this.policy === 'LRU') {
                const value = this.cache.get(key);
                // Move key to the end (recently used)
                this.cache.delete(key);
                this.cache.set(key, value);
            }
            return this.cache.get(key);
        }
        return null;
    }

    size() {
        return this.cache.size;
    }

    evict() {
        if (this.policy === 'FIFO') {
            const oldestKey = this.order.shift(); // Remove least recently used key 
            this.cache.delete(oldestKey);
        } else if (this.policy === 'LRU') {
            // LRU: Remove the first i.e (least recently used) item from the Map
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
    }
}