import express from 'express';
import { getPayloadClient } from './getPayload';
import { nextApp, nextHandler } from './next-utils';

const app = express();

const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL : ${cms.getAdminURL()}`)
      }
    }
  });

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Nextjs started")

    app.listen(PORT, async () => {
      payload.logger.info(`Nextjs app URL : ${process.env.NEXT_PUBLIC_SERVER_URL}`)
    })
  })
}

start();