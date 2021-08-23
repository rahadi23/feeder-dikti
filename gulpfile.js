const { dest, series } = require("gulp");
const ts = require("gulp-typescript");
const merge2 = require("merge2");

function bundle(cb) {
  const tsProject = ts.createProject("tsconfig.json");
  const tsResult = tsProject.src().pipe(tsProject());

  merge2([tsResult.js.pipe(dest("dist")), tsResult.dts.pipe(dest("dist"))]);

  cb();
}

exports.bundle = bundle;
exports.default = series(bundle);
