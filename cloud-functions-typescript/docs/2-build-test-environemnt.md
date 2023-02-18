# cloud functions typescript でのテスト環境の作成

##### なんで記載したか？

cloud functions + typescript でのテスト環境の整理がすくなく、作成する際に苦労しました。(地味にググったし、型参照が。。。)
[これ](https://qiita.com/Gma_Gama/items/02d1d42ccf7b7b5ac606)の続きくらいに考えています。

##### table of contens

1. typescript + jest の環境設定
2. supertest の依存環境を作成
3. cloud function のテストを作成

## 1. typescript jest の環境設定

jest 周辺の依存関係をインストール

```terminal
% pnpm add -D jest ts-jest @types/jest
% npm ts-jest config:init
```

config を作成すると以下になります。

```jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
}
```

あまり利用は現状しないのですが、test 用の ts-config の作成し、jest.config.js の設定を追記していきます。

```terminal
% touch tsconfig.spec.json
```

```tsconfig.spec.json
{
  "extends": "./tsconfig.json"
}
```

package.json に script を編集していきます。

```package.json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
...
```

次に、tsconfig の設定を追加を実施していきます。

```jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
}
```

src/handlers/typescript-function-hanlder.ts 向けに軽くテストを追記します。

```test/handlers/typescript-function-hanlder.spec.ts
import { typescriptFunctionHandler } from '../../src/handlers/typescript-function-handler'

describe('typescriptFunctionHandler', () => {
  it('should return string', () => {
    const result = setup()
    expect(result).toBe('file changed!!')
  })
})

function setup() {
  return typescriptFunctionHandler()
}
```

test script がちゃんと動くか確認します。

```terminal
% pnpm test
> cloud-functions-typescript@1.0.0 test /cloud-functions-typescript
> jest

 PASS  test/handlers/typescript-function-hanlder.spec.ts
  typescriptFunctionHandler
    ✓ should return string (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.172 s, estimated 2 s
Ran all test suites.
```

次に cloud functions のテスト環境用に supertest を作成していきます。

## 2. supertest の依存環境を整理

[supertest](https://www.npmjs.com/package/supertest)の依存関係を追加していきます。

```terminal
% pnpm add -D supertest @types/supertest
```

## 3. cloud functions のテストを作成

[test document](https://github.com/GoogleCloudPlatform/functions-framework-nodejs/blob/master/docs/testing-functions.md#integration-testing-with-supertest)を参考にテストファイルを typescript で作成しようと思ったら Mapping がされていない関係で、ワークアラウンド的に解決しました。
PR 作成できるか、時間とれたら確認しよう。普通に Mapping がずれているだけっぽい。

```test/index.ts
import supertest from 'supertest'

describe('typescriptFunction', () => {
  it('should return 200', async () => {
    const { testServer } = await setup()
    await testServer.post('/').set('Content-Type', 'application/json').expect('file changed!!').expect(200)
  })
})

async function setup() {
  await import('../src/index')
  const { getTestServer } = require('@google-cloud/functions-framework/testing')
  const testServer = supertest(getTestServer('typescriptFunction'))
  return { testServer }
}
```

最後にテストが正常に動くか確認します。

```terminal
% pnpm test
> cloud-functions-typescript@1.0.0 test /cloud-functions-typescript
> jest

 PASS  test/handlers/typescript-function-hanlder.spec.ts
  typescriptFunctionHandler
    ✓ should return string (1 ms)

 PASS  test/index.spec.ts
  typescriptFunction
    ✓ should return 200 (226 ms)

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.532 s, estimated 3 s
Ran all test suites.
```

##### 参考

[Make tsconfigRootDir relative to the .eslintrc file ](https://github.com/typescript-eslint/typescript-eslint/issues/251)
[Configuring Jest](https://jestjs.io/docs/configuration)
[ts-jest](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/)
[Testing Functions](https://github.com/GoogleCloudPlatform/functions-framework-nodejs/blob/master/docs/testing-functions.md#integration-testing-with-supertest)
