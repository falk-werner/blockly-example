function getToolbox() {
    initCustomBlocks();

    return {
        "kind": "categoryToolbox",
        "contents": [
          {
            "kind": "category",
            "name": "Variables",
            "categorystyle": "variable_category",
            "custom": "VARIABLE"
          },
          {
            "kind": "category",
            "name": "Control",
            "categorystyle": "loop_category",
            "contents": [
                {
                  "kind": "block",
                  "type": "controls_if"
                },
                {
                  "kind": "block",
                  "type": "controls_repeat_ext"
                },      
              ]
          },
          {
            "kind": "category",
            "name": "Logic",
            "categorystyle": "logic_category",
            "contents": [
              {
                "kind": "block",
                "type": "logic_boolean"
              },
              {
                "kind": "block",
                "type": "logic_negate"
              },
              {
                "kind": "block",
                "type": "logic_operation"
              },
              {
                "kind": "block",
                "type": "logic_compare"
              },
              {
                "kind": "block",
                "type": "logic_ternary"
              }
            ]
          },
          {
            "kind": "category",
            "name": "Math",
            "categorystyle": "math_category",
            "contents": [
              {
                "kind": "block",
                "type": "math_number"
              },
              {
                "kind": "block",
                "type": "math_arithmetic"
              },    
            ]
          },
          {
            "kind": "category",
            "name": "IO",
            "colour": "#6ec800",
            "contents": [
              {
                "kind": "block",
                "type": "digital_read"
              },
              {
                "kind": "block",
                "type": "digital_write"
              }    
            ]
          }
        ]
      };
}

let g_customBlockInitialized = false;

function initCustomBlocks() {
    if (!g_customBlockInitialized) {
        addDigitalRead();
        addDigitalWrite();
        g_customBlockInitialized = true;
    }
}

function addDigitalRead() {
    Blockly.defineBlocksWithJsonArray([{
        "type": "digital_read",
        "message0": "read digital input %1",
        "args0": [{
          "type": "input_value",
          "name": "ID",
          "check": "Number"
        }],
        "output": "Boolean",
        "colour": "#6ec800",
        "tooltip": "Read a digital input."      
      }]);
  
      Blockly.JavaScript['digital_read'] = function(block) {
        const id = Blockly.JavaScript.valueToCode(block, 'ID', Blockly.JavaScript.ORDER_MEMBER);
        const code = `X_CONTEXT.digitalRead(${id})`;
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
      };
}

function addDigitalWrite() {
    Blockly.defineBlocksWithJsonArray([{
        "type": "digital_write",
        "message0": "set digital output %1 to %2",
        "args0": [{
          "type": "input_value",
          "name": "ID",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "VALUE",
          "check": "Boolean"
        }],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#6ec800",
        "tooltip": "Write to a digital output."      
      }]);
  
      Blockly.JavaScript['digital_write'] = function(block) {
        const id = Blockly.JavaScript.valueToCode(block, 'ID', Blockly.JavaScript.ORDER_MEMBER);
        const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER);
        const code = `X_CONTEXT.digitalWrite(${id}, ${value});\n`;
        return code;
      };  
}

