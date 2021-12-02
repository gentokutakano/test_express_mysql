# Express Server Template
Express × TypeScript × MySQLテンプレート

## Environment Variable
- /.env
- /express/models/.env

※ 共通の値をセット

## Build
```
docker-compose build
```

## NodeModules Install

```
docker-compose run --rm server sh -c 'yarn install'
```

## Start

```
docker-compose up -d
```

## Stop

```
docker-compose stop
```

## Versions
- Node.js:  v12.13.1
- Express:  v4.16.1
- MySQL:    v8.0
