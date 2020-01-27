import { configure } from "@storybook/react"

//console.log(require.context('../src', true, /stories\.tsx$/).keys());
//console.log(require.context('../src', true, /.*\.tsx$/).keys());
configure(require.context("../src/components", true, /.*\.tsx$/), module)
