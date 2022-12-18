# create application directory

```terminal
$ tree . -L 2
├── README.md
├── apps
│   └── react-project
├── node_modules
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

```terminal
$ npm init -y
$ touch pnpm-workspace.yaml
```

```terminal
$ mkdir apps && cd "$_"
$ pnpm create vite react-project --template react-ts

Library/pnpm/store/v3/tmp/dlx-71354      |   +1 +
Packages are hard linked from the content-addressable store to the virtual store.
  Content-addressable store is at: /Users/XXX/Library/pnpm/store/v3
  Virtual store is at:             Library/pnpm/store/v3/tmp/dlx-71354/node_modules/.pnpm
Library/pnpm/store/v3/tmp/dlx-71354      | Progress: resolved 1, reused 1, downloaded 0, added 1, done

Scaffolding project in /Users/XXX/web-front-end-ddd/vite-react-typescript/apps/react-project...

Done. Now run:

  cd react-project
  pnpm install
  pnpm run dev
```