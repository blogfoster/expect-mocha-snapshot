const jestSnapshot = require("jest-snapshot");
const expect = require("expect");

module.exports = function toMatchSnapshot(mochaContext) {
  if (!mochaContext || !mochaContext.test) {
    throw new Error(
      "Missing `mochaContext` argument for .toMatchSnapshot().\n" +
        "Did you forget to pass `this` into expect().toMatchSnapshot(this)?"
    );
  }

  const { test } = mochaContext;

  const snapshotState = new jestSnapshot.SnapshotState(test.file, {
    updateSnapshot: process.env.SNAPSHOT_UPDATE ? "all" : "new"
  });

  const matcher = jestSnapshot.toMatchSnapshot.bind({
    snapshotState,
    currentTestName: makeTestTitle(test)
  });

  const result = matcher(this.actual);
  snapshotState.save();

  expect.assert(result.pass, !result.pass ? result.report() : "");

  return this;
};

function makeTestTitle(test) {
  let next = test;
  const title = [];

  for (;;) {
    if (!next.parent) {
      break;
    }

    title.push(next.title);
    next = next.parent;
  }

  return title.reverse().join(" ");
}
