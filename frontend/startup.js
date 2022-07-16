function startup() {
  const device = new Device('device', 4 ,4);

  const toolbox = getToolbox();
  const workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});
  Blockly.serialization.workspaces.load(getDefaultWorkspace(), workspace);
  device.program = Function("X_CONTEXT", "\"use strict\";" + Blockly.JavaScript.workspaceToCode(workspace));
  device.loop();

  const printButton = document.querySelector("#update_button");
  printButton.addEventListener("click", () => {
    console.log(Blockly.JavaScript.workspaceToCode(workspace));
    device.program = Function("X_CONTEXT", "\"use strict\";" + Blockly.JavaScript.workspaceToCode(workspace));
    device.loop();
  });

  const saveButton = document.querySelector("#save_button");
  saveButton.addEventListener("click", () => {
    const contents = JSON.stringify(Blockly.serialization.workspaces.save(workspace));
    const b64 = btoa(contents);
    downloadURI(`data:application/json;base64,${b64}`, "workspace.json");
  });

  const fileChooser = document.querySelector("#file_chooser");
  fileChooser.addEventListener("change", function() {
    const input = this;
    const file = input.files[0];

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const json = JSON.parse(reader.result);
      Blockly.serialization.workspaces.load(json, workspace);
    }
    reader.onerror = () => {
      console.log(reader.error);
    }
  });

  const loadButton = document.querySelector("#load_button");
  loadButton.addEventListener("click", () => {
    fileChooser.click();
  });


  const exportButton = document.querySelector("#export_js");
  exportButton.addEventListener("click", () => {
    const contents = Blockly.JavaScript.workspaceToCode(workspace);
    const b64 = btoa(contents);
    downloadURI(`data:text/jjavascript;base64,${b64}`, "workspace.js");
  });


  document.addEventListener('keyup', ({ key, ctrlKey, shiftKey, metaKey, altKey }) => {      
    if (
        key === 'F12' ||
        (ctrlKey && shiftKey && key === 'I') ||
        (metaKey && altKey && key === 'i')
    ) {
      backend.openDevTools();
    }
  });
}

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

window.addEventListener('DOMContentLoaded', () => {
  startup();
});
