import Folder from "./folder";

export default class FileSystem {
  constructor() {
    this.root = new Folder(""); // root is invisible
    this.logs = [];
    this.currAction = "";
  }

  run(command) {
    this.logs.push(command);
    const [action, ...args] = command.split(" ");
    switch (action) {
      case "CREATE":
        return this.create(args[0]);
      case "LIST":
        return this.list();
      case "MOVE":
        return this.move(args[0], args[1]);
      case "DELETE":
        return this.delete(args[0]);
      default:
        this.logs.push(`Unknown command: ${action}`);
    }
  }

  create(path) {
    const parts = path.split("/");

    let current = this.root;

    parts.forEach((part, index) => {
      if (index === parts.length - 1 && current.hasChild(part)) {
        this.logs.push(`Cannot create ${path} - ${part} already exists`);
        return;
      }
      current = current.addChild(part);
    });
  }

  /**
   * find target folder and its parent, also locate missing/error folder
   * also can provide a target after the action verb for error message
   * @param {string} path
   * @param {string} [targetForMsg]
   * @returns {{
   *   success: true,
   *   payload: {
   *     target: Folder,
   *     parent: Folder,
   *   },
   * } | {
   *   success: false,
   *   payload: {
   *     missing: string,
   *   },
   * }}
   */
  findFolder(path, targetForMsg = "") {
    // handle empty path
    if (!path) return { success: true, payload: { found: this.root } };

    const parts = path.split("/");
    let current = this.root;
    let parent = null;
    for (const part of parts) {
      if (!current.hasChild(part)) {
        this.logs.push(
          `Cannot ${this.currAction} ${
            targetForMsg || path
          } - ${part} does not exist`
        );
        return { success: false, payload: { missing: part } };
      }
      parent = current;
      current = current.getChild(part);
    }
    return { success: true, payload: { target: current, parent } };
  }

  move(targetPath, toPath) {
    if (targetPath === toPath) {
      this.logs.push(`Cannot move ${targetPath} to itself`);
      return;
    }

    this.currAction = "move";

    // find target and parent folders
    const { success: targetSuccess, payload: targetPayload } =
      this.findFolder(targetPath);

    if (!targetSuccess) return;

    const targetFolder = targetPayload.target;
    const parentFolder = targetPayload.parent;

    // find toPath folder
    const { success: toSuccess, payload: toPayload } = this.findFolder(
      toPath,
      targetPath
    );

    if (!toSuccess) return;

    const toFolder = toPayload.target;

    // check if target already exists in toPath
    if (toFolder.hasChild(targetFolder.name)) {
      this.logs.push(
        `Cannot move ${targetPath} - ${targetFolder.name} already exists in ${toPath}`
      );
      return;
    }

    toFolder.children.set(targetFolder.name, targetFolder);
    parentFolder.removeChild(targetFolder.name);
  }

  delete(path) {
    this.currAction = "delete";
    const { success, payload } = this.findFolder(path);

    if (!success) return;

    const targetFolder = payload.target;
    const parentFolder = payload.parent;

    parentFolder.removeChild(targetFolder.name);
  }

  list() {
    const listOutput = []; // call by reference
    const topLevel = Array.from(this.root.children.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    for (const child of topLevel) {
      child.list(0, listOutput); // call by reference
    }
    this.logs.push(...listOutput);
  }

  getLogs() {
    return this.logs.join("\n");
  }
}
