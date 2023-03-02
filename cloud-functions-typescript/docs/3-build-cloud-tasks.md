# cloud tasks を local 環境で作成する

## why do this

## 1. docker 環境を作成する

```terminal
% touch compose.yaml
% mkdir docker
% touch docker/cloud-tasks.dockerfile
```

```docker/cloud-tasks.dockerfile
FROM python:3.11

ENV APP_ENGINE_EMULATOR_HOST=http://localhost:3000

WORKDIR /usr/src/app

RUN touch requirements.txt
RUN pip install gcloud-tasks-emulator
```

```compose.yaml
version: '3.9'

services:
  cloud_tasks:
    container_name: cloud_tasks_container
    build:
      context: ./docker
      dockerfile: cloud-tasks.dockerfile
    ports:
      - '9090:9090'
    restart: 'always'
    command: gcloud-tasks-emulator start --port=9090
    networks:
      - local

networks:
  local: {}

```

## 2. cloud functions から叩いてみる

clud tasks を登録して、疎通を確認する。
