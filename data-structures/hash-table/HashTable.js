const LinkedList = require("../linked-list/LinkedList");

const defaultHashTableSize = 32;

class HashTable {
  constructor(hashTableSize = defaultHashTableSize) {
    this.buckets = Array(hashTableSize)
      .fill()
      .map(() => new LinkedList());
    this.keys = {};
  }

  hash(key) {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    );

    return hash % this.buckets.length;
  }

  set(key, value) {
    const hashKey = this.hash(key);
    this.keys[key] = hashKey;
    const bucketLinkedList = this.buckets[hashKey];
    const node = bucketLinkedList.find({
      callback: nodeValue => nodeValue.key === key
    });

    if (!node) {
      bucketLinkedList.append({ key, value });
    } else {
      node.value.value = value;
    }
  }
}
