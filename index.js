const jestSnapshot = require("jest-snapshot");
const expect = require("expect");

module.exports = function toMatchSnapshot(received, mochaContext, name) {
  if (!mochaContext || !mochaContext.test) {
    throw new Error(
      "Missing `mochaContext` argument for .toMatchSnapshot().\n" +
        "Did you forget to pass `this` into expect().toMatchSnapshot(this)?"
    );
  }

  const { test } = mochaContext;


  const snapshotResolver = jestSnapshot.buildSnapshotResolver({ rootDir: 'test' })

  const snapshotFile = snapshotResolver.resolveSnapshotPath(test.file)

  const snapshotState = new jestSnapshot.SnapshotState(snapshotFile, {
    updateSnapshot: process.env.SNAPSHOT_UPDATE ? "all" : "new"
  });

  const matcher = jestSnapshot.toMatchSnapshot.bind({
    snapshotState,
    currentTestName: makeTestTitle(test)
  });

  const result = matcher(received, name || '');


  snapshotState.save();

  return result
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
