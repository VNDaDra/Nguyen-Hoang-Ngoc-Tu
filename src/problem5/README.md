## 1. Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

## 2.a Running application (Standard way)

```bash
$ npm ci
```

- Development Mode: `npm run dev`
- Building: `npm run build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `npm run build && npm run start`

## 2.b Running application (Using docker)
```bash
$ docker compose up -d
```