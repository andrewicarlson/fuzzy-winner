# Project Starter

This is an opinionated project starter using:

* Task Runner: Gulp
* Transpiler: Babel
* JavaScript: TypeScript
* CSS PreProcessor: Sass
* Extras: Browsersync
* HTML Templating Engine: Pug

It expects the following project structure:

```
gulpfile.js
package.json
-- index.ts
-- styles.scss
-- index.pug
-- components/
----- _imports.scss // Imports for all components Sass files
----- header
------- _header.scss
------- header.pug
------- header.ts
```

`npm install` to install, `gulp serve` to run the local server for development, `gulp` to build production files.
