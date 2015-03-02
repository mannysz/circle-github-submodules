// Check if exists the given element in Array
Array.prototype.contains = function(element) {
    return this.lastIndexOf(element) != -1;
}
