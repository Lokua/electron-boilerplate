# electron-boilerplate

The minimal boilerplate with a focus on keeping the tool chain
as lean as possible (no babel or webpack). It uses the excellent [esm](https://github.com/standard-things/esm) library
as a stepping stone towards native ES modules in node and the browser. When those 
things are no longer experimental, hopefully that tool can 
be removed with little refactoring.

React without JSX is ready to go, however if not using React you 
can uninstall the react dependencies and remove the React setup code from
[./src/renderer.mjs](./src/renderer.mjs)

The project also includes a simple build script using electron-packager. Currently
only does OSX but should be pretty easy to add other platforms