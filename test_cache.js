import { Cache } from './cache.js';  
import { expect } from 'chai';     

describe('Cache Tests', () => {

    // Test 1: Basic Functionality (Adding and Retrieving Items)
    it('Basic functionality', () => {
        const cache = new Cache(2, 'LRU');  // Create a cache with capacity of 2 and LRU policy
        cache.put(1, 'A');
        cache.put(2, 'B');
       
        expect(cache.get(1)).to.equal('A');  // Expect value with key 1 to be 'A'
        expect(cache.get(2)).to.equal('B');  // Expect value with key 2 to be 'B'
    });

    // Test 2: LRU Eviction Policy (Evicts Least Recently Used item)
    it('LRU Eviction Policy', () => {
        const cache = new Cache(2, 'LRU');  // LRU eviction policy
        cache.put(1, 'A');                  // Add key 1
        cache.put(2, 'B');                  // Add key 2
        cache.get(1);                       // Access key 1, making it the most recently used
        cache.put(3, 'C');                  // Adding key 3, should evict key 2 (LRU)
        expect(cache.get(2)).to.be.null;    // Expect key 2 to be evicted (null)
        expect(cache.get(1)).to.equal('A'); // Key 1 should still be present
        expect(cache.get(3)).to.equal('C'); // Key 3 should be present
    });

    // Test 3: FIFO Eviction Policy (Evicts First Added Item)
    it('FIFO Eviction Policy', () => {
        const cache = new Cache(2, 'FIFO');  // FIFO eviction policy
        cache.put(1, 'A');                  // Add key 1
        cache.put(2, 'B');                  // Add key 2
        cache.put(3, 'C');                  // Adding key 3, should evict key 1 (FIFO)
        expect(cache.get(1)).to.be.null;    // Expect key 1 to be evicted (null)
        expect(cache.get(2)).to.equal('B'); // Key 2 should still be present
        expect(cache.get(3)).to.equal('C'); // Key 3 should be present
    });

    // Test 4: Item Retrieval After Eviction (Ensure evicted items are not retrievable)
    it('Item retrieval after eviction', () => {
        const cache = new Cache(2, 'LRU');
        cache.put(1, 'A');
        cache.put(2, 'B');
        cache.put(3, 'C');                  // Evicts key 1
        expect(cache.get(1)).to.be.null;    // Key 1 should no longer be retrievable    
        expect(cache.get(2)).to.equal('B'); // Key 2 should still be retrievable
    });

    // Test 5: Cache Size Management (Check if size is tracked correctly)
    it('Cache size management', () => {
        const cache = new Cache(2, 'LRU');
        cache.put(1, 'A');
        cache.put(2, 'B');
        expect(cache.size()).to.equal(2);   // Cache should have 2 items
        cache.put(3, 'C');                  // Add key 3, should evict one item
        expect(cache.size()).to.equal(2);   // Cache size should still be 2
    });

});
