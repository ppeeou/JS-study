const LinkedListNode = require("./LinkedListNode");
const Comparator = require("../../utils/comparator/Comparator");

class LinkedList {
  constructor(compareFunction) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(compareFunction);
  }

  prepend(value) {
    const node = new LinkedListNode(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      return this;
    }
    node.next = this.head;
    this.head = node;
    return this;
  }

  append(value) {
    const node = new LinkedListNode(value, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    return this;
  }

  delete(value) {
    if (!this.head) return null;
    let deleteNode = null;
    let currentNode = this.head;
    // if head delete
    while (this.compare.equal(currentNode.value, value)) {
      deleteNode = currentNode;
      this.head = currentNode.next;
    }

    if (currentNode) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }
    return deleteNode;
  }

  find({ value, callback }) {
    if (!this.head) return null;

    let currentNode = this.head;

    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }
      if (value && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  deleteHead() {
    if (!this.head) return null;

    const deleteNode = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deleteNode;
  }

  deleteTail() {
    if (!this.head) return null;

    const deleteNode = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deleteNode;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.tail = currentNode;
    return deleteNode;
  }

  reverse() {
    let currentNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;
    return this;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  toString(callback) {
    return this.toArray()
      .map(node => node.toString(callback))
      .toString();
  }
}

module.exports = LinkedList;
