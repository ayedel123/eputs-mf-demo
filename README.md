# eputs-mf-demo

Демонстрационный проект по интеграции модуля (React 17) в host-приложение (React 19) с использованием Webpack Module Federation.

## Структура

- **host** — основное приложение на React 19
- **dtp-map-module** — подключаемый модуль на React 17 (изначально single-spa)
- **modern-remote** — подключаемый модуль на React 19

## Особенности

Для работы модуля в режиме Module Federation добавлены файлы:

- `ts.config.mf.json`
- `webpack.config.mf.js`
- `bootstrap-mf.ts`

## Запуск

Модули на разной версии node 

### Модуль (dtp-map-module)

```bash
# Node.js 20.11.1
npm install
npm run start:mf
```

### Modern-remote

Важно, использует `yarn` 

```bash
# Node.js 22.18.0
yarn install
yarn start
```

### Host

Важно, использует `yarn` 

```bash
# Node.js 22.18.0
yarn install
yarn start
```

Старый модули на Single-spa рендерится напрямую в DOM-узел, как и было в single-spa 
