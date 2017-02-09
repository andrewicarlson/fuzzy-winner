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

1. `npm install gulp -g` if you haven't already
2. `npm install` to install the project dependencies.
3. `gulp serve` to run the local server for development.
4. `gulp` to build production files
