# Cloud functionsd の環境構築

##### why do this?

cloud funcitons + typescript がまとまった情報が少なかったための備忘録。

##### 参考っていうか、答え

[GoogleCloudPlatform/functions-framework-nodejs](https://github.com/GoogleCloudPlatform/functions-framework-nodejs/blob/master/docs/typescript.md)

[watch files](https://github.com/GoogleCloudPlatform/functions-framework-nodejs/issues/52)

## table of contents

1. Project と依存関係を構築する
2. typescript の環境を構築する
3. cloud functions の作成
4. run server の依存関係を入れる
5. formatter を追加

## 1. Project と依存関係を構築する

```terminal
% mkdir cloud-funciton-typescript
% cd cloud-funciton-typescript
% pnpm init
% pnpm add @google-cloud/functions-framework
% pnpm add -D typescript
```

## 2. typescript の環境を構築する

```terminal
% touch tsconfig.json
% vi tsconfig.json
```

```tsconfig.json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

package.json を変更する。cloud functions を build や local で server を起動するために、package.json を編集してきます。

```package.json
{
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "functions-framework --target=TypescriptFunction",
    "prestart": "npm run build",
    "gcp-build": "npm run build"
  },
...
```

## 3. cloud functions の作成

```src/index.ts
import * as ff from '@google-cloud/functions-framework';

ff.http('TypescriptFunction', (req: ff.Request, res: ff.Response) => {
  res.send('ok!');
});
```

```terminal
% pnpm build
% pnpm start
```

[http://localhost:8080/](http://localhost:8080/)にアクセスして、ok!が表示されるか確認します。

## 4. run server の依存関係を入れる

上記の設定のみの場合は、ファイルを変更しても server が検知してくれないため、ファイルを変更したら、server もリスタートする pacakge を追加、設定していきます。

```terminal
% pnpm i -D tsc-watch
```

```pacakge.json
{
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsc-watch --onSuccess 'functions-framework --target=TypescriptFunction'",
    "start": "functions-framework --target=TypescriptFunction",
```

```terminal
% pnpm dev
```

上の設定が完了したら、server を起動してファイル編集がうまく動くか確認していきます。

[http://localhost:8080/](http://localhost:8080/)で,file changed 表示されたら、ファイルの変更検知が有効になっているか確認します。

```src/index.ts
import * as ff from '@google-cloud/functions-framework';

ff.http('TypescriptFunction', (req: ff.Request, res: ff.Response) => {
  res.send('file chanegd!!');
});
```

## 5. formatter を追加

最後に eslint と prettier を追加して最低限開発環境を作成していきます。

### 5-a. eslint を設定

```terminal
% pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

次に eslint の設定を追加していきます。

```terminal
% npm init @eslint/config
% vi .eslintrc.json
```

```.eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": "standard-with-typescript",
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["./tsconfig.json"]
  },
  "rules": { "quotes": ["error", "single"] }
}
```

package.json のコマンドを追加して、linter を鵜がかせるように実施していきます。

```pacakge.json
{
  "main": "dist/index.js",
  "scripts": {
    "lint": "eslint \"src/**/*.{js,ts}\"",
    "lint:fix": "eslint --fix \"src/**/*.{js,ts}\"",
```

## 5-b. prettier を設定

prettier の依存関係を設定していきます。

```terminal
% pnpm add -D prettier eslint-config-prettier
% vi .prettierrc
```

.prettierrc を設定します。

```.prettierrc
{
  "printWidth": 120,
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "arrowParens": "always",
  "useTabs": false,
  "endOfLine": "lf"
}
```

最後に有効状態になったかを確認していきます。

```terminal
% pnpm format
 cloud-functions-typescript@1.0.0 format /cloud-functions-typescript
> prettier --write "src/**/*.{js,ts}"

src/index.ts 184ms
```

以上となります。
