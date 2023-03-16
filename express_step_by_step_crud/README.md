# Express nodejs step by step

## 1. docker local project

```terminal
% git clone --depth 1 https://github.com/supabase/supabase
%
```

## 1. create package

```terminal
% pnpm init
% pnpm install express morgan nodemon body-parser
% pnpm install -D typescript @types/node ts-node @types/express
% npx tsc --init
% pnpm i -D @types/morgan @types/body-parser
```

## refs

[refs](https://supabase.com/docs/guides/self-hosting/docker)
