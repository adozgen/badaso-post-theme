import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";

let exported = {};

// DYNAMIC IMPORT BADASO STORES
try {
  const modules = require.context("./modules", false, /\.js$/); //
  modules.keys().forEach((fileName) => {
    let property = fileName
      .replace("./", "")
      .replace(".js", "")
      .replace(/([a-z])([A-Z])/g, "$1-$2") // get all lowercase letters that are near to uppercase ones
      .replace(/[\s_]+/g, "-") // replace all spaces and low dash
      .replace(/^\.\/_/, "")
      .replace(/\.\w+$/, "")
      .split("-")
      .map((word, index) => {
        if (index > 0) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
          return word;
        }
      })
      .join("");
    exported[property] = modules(fileName).default;
  });
} catch (error) {
  console.info("Failed to load badaso stores", error);
}

Vue.use(Vuex);
/* eslint-disable */
export default new Vuex.Store({
  modules: exported,
});
