Device = function(id, input_count, output_count) {
    const base = document.querySelector("#" + id);
    const device = this;

    this.program = (context) => {};

    this.inputs = [];
    for(let i = 0; i < input_count; i++) {
        const element = base.querySelector(`[data-id='in_${i}']`);
        this.inputs.push(element);
        element.addEventListener('change', () => {
            device.loop();
        });
    }

    this.outputs = [];
    for(let i = 0; i < output_count; i++) {
        const element = base.querySelector(`[data-id='out_${i}']`);
        this.outputs.push(element);
    }
}

Device.prototype.digitalRead = function(input_id) {
    if ((0 <= input_id) && (input_id < this.inputs.length)) {
        const value = this.inputs[input_id].checked; 
        console.log(`read input #${input_id}: ${value}`);
        return value;
    }
    else {
        console.log(`try to read invalid input: ${input_id}`);
    }
}

Device.prototype.digitalWrite = function(output_id, value) {
    if ((0 <= output_id) && (output_id < this.outputs.length)) {
        console.log(`set output #${output_id} to ${value}`);
        const className = value ? "on" : "off";

        const element = this.outputs[output_id];
        element.className = className;
    }
    else {
        console.log(`try to write invalid output: ${output_id}`);
    }
}

Device.prototype.loop = function() {
    const context = this;
    this.program(this);
}