import FileSystem from "../src/file-system";

describe("FileSystem integration tests", () => {
  let fs;

  beforeEach(() => {
    fs = new FileSystem();
  });

  test("CREATE + LIST should build nested folders correctly", () => {
    fs.run("CREATE fruits");
    fs.run("CREATE fruits/apples");
    fs.run("CREATE fruits/apples/fuji");
    fs.run("LIST");

    const output = fs.getOutput();
    expect(output).toEqual(
      [
        "CREATE fruits",
        "CREATE fruits/apples",
        "CREATE fruits/apples/fuji",
        "LIST",
        "fruits",
        "  apples",
        "    fuji",
      ].join("\n")
    );
  });

  test("MOVE should move a folder and its children correctly", () => {
    fs.run("CREATE fruits");
    fs.run("CREATE fruits/apples");
    fs.run("CREATE fruits/apples/fuji");
    fs.run("CREATE vegetables");
    fs.run("MOVE fruits/apples vegetables");
    fs.run("LIST");

    const output = fs.getOutput();
    expect(output).toContain(["vegetables", "  apples", "    fuji"].join("\n"));
  });

  test("DELETE should remove a folder", () => {
    fs.run("CREATE fruits/apples/fuji");
    fs.run("DELETE fruits/apples/fuji");
    fs.run("LIST");

    const output = fs.getOutput();
    expect(output).toEqual(
      [
        "CREATE fruits/apples/fuji",
        "DELETE fruits/apples/fuji",
        "LIST",
        "fruits",
        "  apples",
      ].join("\n")
    );
  });

  test("DELETE non-existent folder should log an error", () => {
    fs.run("DELETE fruits/apples");
    const output = fs.getOutput();
    expect(output).toMatch(/Cannot delete fruits\/apples/i);
  });

  test("MOVE non-existent source should log an error", () => {
    fs.run("CREATE vegetables");
    fs.run("MOVE fruits/banana vegetables");
    const output = fs.getOutput();
    expect(output).toMatch(/Cannot move fruits\/banana/i);
  });
});
