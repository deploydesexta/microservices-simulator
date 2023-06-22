This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker

First, create the network and volumes:

```bash
docker volume create ms_simulator_redis
docker network create ms_simulator
```

Then, run the compose file:

```bash
docker compose up -d
```