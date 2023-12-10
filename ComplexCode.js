// File: ComplexCode.js

/**
 * This is a complex JavaScript code example.
 * It demonstrates a custom implementation of a data structure called a "Red-Black Tree".
 * A Red-Black Tree is a self-balancing binary search tree.
 * This code includes operations to insert, delete, search, and traverse the tree.
 * It also includes several utility methods for tree manipulation and validation.
 */

class Node {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.left = null;
    this.right = null;
    this.isRed = true; // Color property for Red-Black Tree
  }
}

class RedBlackTree {
  constructor() {
    this.root = null;
  }

  // Utility method to check if a node is a left child
  isLeftChild(node) {
    return node === node.parent.left;
  }

  // Utility method to check if a node is a right child
  isRightChild(node) {
    return node === node.parent.right;
  }

  // Perform a left rotation
  rotateLeft(node) {
    const rightChild = node.right;
    node.right = rightChild.left;

    if (rightChild.left !== null)
      rightChild.left.parent = node;

    rightChild.parent = node.parent;

    if (node.parent === null)
      this.root = rightChild;
    else if (this.isLeftChild(node))
      node.parent.left = rightChild;
    else
      node.parent.right = rightChild;

    rightChild.left = node;
    node.parent = rightChild;
  }

  // Perform a right rotation
  rotateRight(node) {
    const leftChild = node.left;
    node.left = leftChild.right;

    if (leftChild.right !== null)
      leftChild.right.parent = node;

    leftChild.parent = node.parent;

    if (node.parent === null)
      this.root = leftChild;
    else if (this.isRightChild(node))
      node.parent.right = leftChild;
    else
      node.parent.left = leftChild;

    leftChild.right = node;
    node.parent = leftChild;
  }
  
  // Utility method to balance the tree after an insertion
  balanceTreeAfterInsertion(node) {
    while (node.parent !== null && node.parent.isRed) {
      if (this.isLeftChild(node.parent)) {
        const uncle = node.parent.parent.right;

        if (uncle !== null && uncle.isRed) {
          node.parent.isRed = false;
          uncle.isRed = false;
          node.parent.parent.isRed = true;
          node = node.parent.parent;
        } 

        else {
          if (this.isRightChild(node)) {
            node = node.parent;
            this.rotateLeft(node);
          }
          
          node.parent.isRed = false;
          node.parent.parent.isRed = true;
          this.rotateRight(node.parent.parent);
        }
      } 
      
      else {
        const uncle = node.parent.parent.left;

        if (uncle !== null && uncle.isRed) {
          node.parent.isRed = false;
          uncle.isRed = false;
          node.parent.parent.isRed = true;
          node = node.parent.parent;
        } 

        else {
          if (this.isLeftChild(node)) {
            node = node.parent;
            this.rotateRight(node);
          }
          
          node.parent.isRed = false;
          node.parent.parent.isRed = true;
          this.rotateLeft(node.parent.parent);
        }
      }
    }
  
    this.root.isRed = false;
  }

  // Utility method to balance the tree after deletion
  balanceTreeAfterDeletion(node, parent) {
    while (node !== this.root && (!node || !node.isRed)) {
      if (node === parent.left) {
        let sibling = parent.right;

        if (sibling.isRed) {
          sibling.isRed = false;
          parent.isRed = true;
          this.rotateLeft(parent);
          sibling = parent.right;
        }

        if ((!sibling.left || !sibling.left.isRed) && (!sibling.right || !sibling.right.isRed)) {
          sibling.isRed = true;
          node = parent;
          parent = (node !== null) ? node.parent : null;
        } 

        else {
          if (!sibling.right || !sibling.right.isRed) {
            sibling.left.isRed = false;
            sibling.isRed = true;
            this.rotateRight(sibling);
            sibling = parent.right;
          }

          sibling.isRed = parent.isRed;
          parent.isRed = false;

          if (sibling.right)
            sibling.right.isRed = false;

          this.rotateLeft(parent);
          node = this.root;
          break;
        }
      } 
      
      else {
        let sibling = parent.left;

        if (sibling.isRed) {
          sibling.isRed = false;
          parent.isRed = true;
          this.rotateRight(parent);
          sibling = parent.left;
        }

        if ((!sibling.left || !sibling.left.isRed) && (!sibling.right || !sibling.right.isRed)) {
          sibling.isRed = true;
          node = parent;
          parent = (node !== null) ? node.parent : null;
        } 

        else {
          if (!sibling.left || !sibling.left.isRed) {
            sibling.right.isRed = false;
            sibling.isRed = true;
            this.rotateLeft(sibling);
            sibling = parent.left;
          }

          sibling.isRed = parent.isRed;
          parent.isRed = false;

          if (sibling.left)
            sibling.left.isRed = false;

          this.rotateRight(parent);
          node = this.root;
          break;
        }
      }
    }

    if (node)
      node.isRed = false;
  }

  // Inserts a value into the Red-Black Tree
  insert(value) {
    const newNode = new Node(value);

    let parent = null;
    let current = this.root;

    while (current !== null) {
      parent = current;

      if (value < current.value)
        current = current.left;
      else
        current = current.right;
    }

    newNode.parent = parent;

    if (parent === null)
      this.root = newNode;
    else if (value < parent.value)
      parent.left = newNode;
    else
      parent.right = newNode;

    this.balanceTreeAfterInsertion(newNode);
  }

  // Deletes a value from the Red-Black Tree
  delete(value) {
    let node = this.search(value);

    if (!node)
      return;

    let successor;
    let successorOriginalColor;    

    // Case 1: Node has no children
    if (!node.left && !node.right) {
      if (node === this.root) {
        this.root = null;
      } else {
        const sibling = this.getSibling(node);

        if (this.isLeftChild(node))
          node.parent.left = null;
        else
          node.parent.right = null;

        this.balanceTreeAfterDeletion(null, sibling);
      }
    }

    // Case 2: Node has at most one child
    else if (!node.left || !node.right) {
      const child = (node.left !== null) ? node.left : node.right;

      if (node === this.root) {
        this.root = child;
        child.parent = null;
      } else {
        if (this.isLeftChild(node))
          node.parent.left = child;
        else
          node.parent.right = child;

        child.parent = node.parent;

        if (!node.isRed)
          this.balanceTreeAfterDeletion(child, node.parent);
        else
          child.isRed = false;
      }
    }

    // Case 3: Node has two children
    else {
      successor = this.getMinimum(node.right);
      successorOriginalColor = successor.isRed;
      let fixNodeParent = null;

      if (successor === node.right) {
        fixNodeParent = successor;
      } else {
        fixNodeParent = successor.parent;
        successorOriginalColor = successor.isRed;
        
        this.balanceTreeAfterDeletion(successor.right, successor.parent);
        successor.right = node.right;
        successor.right.parent = successor;       
      }

      this.balanceTreeAfterDeletion(successor, fixNodeParent);

      if (node === this.root) {
        this.root = successor;
        successor.parent = null;
      } else {
        if (this.isLeftChild(node))
          node.parent.left = successor;
        else
          node.parent.right = successor;

        successor.parent = node.parent;
        successor.left = node.left;
        successor.left.parent = successor;

        if (!node.isRed)
          successor.isRed = false;
      }
    }
  }

  // Searches for a value in the Red-Black Tree
  search(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.value)
        return current;

      if (value < current.value)
        current = current.left;
      else
        current = current.right;
    }

    return null;
  }

  // Utility method to get the minimum node in the tree
  getMinimum(node) {
    let current = node;

    while (current !== null && current.left !== null)
      current = current.left;

    return current;
  }
  
  // Utility method to get a node's sibling
  getSibling(node) {
    if (this.isLeftChild(node))
      return node.parent.right;
    else
      return node.parent.left;
  }

  // Performs an in-order traversal of the Red-Black Tree
  inOrderTraversal(node) {
    if (node) {
      this.inOrderTraversal(node.left);
      console.log(node.value);
      this.inOrderTraversal(node.right);
    }
  }
}

// ======= Usage Example =======

const tree = new RedBlackTree();

tree.insert(50);
tree.insert(40);
tree.insert(60);
tree.insert(30);
tree.insert(70);
tree.insert(20);
tree.insert(80);

console.log("In-order traversal:");
tree.inOrderTraversal(tree.root);

console.log("Deleting 30...");
tree.delete(30);

console.log("In-order traversal after deletion:");
tree.inOrderTraversal(tree.root);

// ... Continuing with more operations on the tree

// End of ComplexCode.js