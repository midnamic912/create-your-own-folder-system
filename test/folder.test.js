import Folder from "../src/folder";

describe("Folder class", () => {
  let root;

  beforeEach(() => {
    root = new Folder("root");
  });

  test("addChild should create a new folder", () => {
    const child = root.addChild("fruits");
    expect(child).toBeInstanceOf(Folder);
    expect(child.name).toBe("fruits");
    expect(root.hasChild("fruits")).toBe(true);
  });

  test("addChild should not overwrite existing folder", () => {
    const child1 = root.addChild("fruits");
    const child2 = root.addChild("fruits");
    expect(child1).toBe(child2); // Same instance
  });

  test("getChild should return the correct folder", () => {
    root.addChild("fruits");
    const child = root.getChild("fruits");
    expect(child.name).toBe("fruits");
  });

  test("removeChild should remove a folder", () => {
    root.addChild("fruits");
    root.removeChild("fruits");
    expect(root.hasChild("fruits")).toBe(false);
  });

  test("list should return a sorted, indented tree", () => {
    root.addChild("b");
    root.addChild("a");
    root.getChild("a").addChild("x");
    root.getChild("a").addChild("y");

    const output = root.list(); // return an array of strings
    expect(output).toEqual(["root", "  a", "    x", "    y", "  b"]);
  });
});
