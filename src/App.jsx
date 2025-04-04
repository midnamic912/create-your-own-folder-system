import { useState, useRef } from "react";
import "./App.css";
import FileSystem from "./file-system";

const fs = new FileSystem();

function App() {
  const inputDivRef = useRef(null);
  const [output, setOutput] = useState("");

  const validCommandsPrefixes = new Set(["CREATE", "MOVE", "DELETE", "LIST"]);

  const findInvalidCommand = (commands) => {
    if (commands.length === 0) return false;

    const invalidCommand = commands.find((command) => {
      const prefix = command.split(" ")[0].toUpperCase();
      return !validCommandsPrefixes.has(prefix);
    });

    return invalidCommand;
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");
    const selection = window.getSelection();

    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.insertNode(document.createTextNode(text));
  };

  const handleEnter = (e) => {
    if (e.key !== "Enter") return;
    if (e.key === "Enter" && e.shiftKey) return; // ignore shift + enter
    e.preventDefault();

    const lines = e.target.innerText.split("\n").filter((line) => line !== "");
    console.log("lines", lines);

    const invalidCommand = findInvalidCommand(lines);

    if (invalidCommand) {
      alert(`Invalid command: ${invalidCommand}`);
      return;
    }

    const upperCaseLines = lines.map((line) => {
      const [prefix, ...args] = line.split(" ");
      return (prefix.toUpperCase() + " " + args.join(" ")).trim();
    });

    inputDivRef.current.innerText = "";

    for (const command of upperCaseLines) {
      fs.run(command);
    }

    setOutput(fs.getOutput());
  };

  return (
    <>
      <div className="main">
        <h1>Create Your Own Folder System! 🗂️</h1>
        <p>Please enter the command you want to run: </p>
        <div className="input-container">
          <div
            contentEditable
            ref={inputDivRef}
            className="input"
            onPaste={(e) => handlePaste(e)}
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>

        <div className="command-list">{output}</div>
      </div>
    </>
  );
}

export default App;
