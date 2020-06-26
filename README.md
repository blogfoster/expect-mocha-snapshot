# expect-mocha-snapshot

> `expect` extension to use Jest's `toMatchSnapshot` in Mocha

The module uses [`jest-snapshot`](https://github.com/facebook/jest/tree/master/packages/jest-snapshot) under the hood and works as an extension to [`expect@1.20.x`](https://github.com/mjackson/expect) to enable snapshot-testing in [`mocha`](https://github.com/mochajs/mocha).

All credit goes to [Alexander Beletsky](https://github.com/alexbeletsky). See his blog post about [snapshot-testing in Mocha here](https://medium.com/blogfoster-engineering/how-to-use-the-power-of-jests-snapshot-testing-without-using-jest-eff3239154e5).

## Usage

```js
const expect = require('expect');
const toMatchSnapshot = require('expect-mocha-snapshot');

expect.extend({ toMatchSnapshot });

describe('foo', function () {
  it('matches the snapshot', function () {
    expect({ foo: 'bar' }).toMatchSnapshot(this);
  });
});
```

To create the snapshot or test the code against the created snapshots, just run `mocha` like you normally would.

```sh
mocha
```

If your tests are failing and you want to update the snapshot, use the environment variable `SNAPSHOT_UPDATE`.

```sh
SNAPSHOT_UPDATE=true mocha
```

## Compatibility

Compatibility with `expect` and `jest-snapshot` is a moving target.
The `2.x` has been tested with "expect": "^26.1.0", "jest-snapshot": "^26.1.0" and "mocha": "^8.0.1"

For lower versions of `jest-snapshot` and `expect` stick to `1.x` release.

## License

MIT
