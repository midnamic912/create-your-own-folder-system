export default class Folder {
  constructor(name) {
    this.name = name;
    this.children = new Map(); //{name: Folder}
  }

  hasChild(name) {
    return this.children.has(name);
  }

  getChild(name) {
    return this.children.get(name);
  }

  // if child does not exist, create it; if it exists, return child
  addChild(name) {
    if (!this.hasChild(name)) {
      this.children.set(name, new Folder(name));
    }

    return this.children.get(name);
  }

  removeChild(name) {
    this.children.delete(name);
  }

  list(indent = 0, lines = []) {
    lines.push("  ".repeat(indent) + this.name);
    const sorted = Array.from(this.children.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    for (const child of sorted) {
      child.list(indent + 1, lines);
    }
    return lines;
  }
}
