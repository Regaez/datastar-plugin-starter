import { action } from "datastar";

import type { ActionPlugin } from "@types";

// Example action plugin configuration
const plugin: ActionPlugin<string | number> = {
  name: "fizzbuzz",
  apply(_ctx, value: number) {
    let output = "";
    if (value % 3 === 0) output += "fizz";
    if (value % 5 === 0) output += "buzz";
    return output || value;
  },
};

// Register the plugin
action(plugin);
