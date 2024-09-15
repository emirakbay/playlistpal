import { createClient } from "redis";

let client: ReturnType<typeof createClient> | null = null;

async function getClient() {
  if (!client) {
    client = createClient({
      password: process.env.REDIS_PW,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT!),
      },
    });

    client.on("connect", (...args) => {
      console.log(args);
    });

    client.on("error", (err) => console.log(err));

    await client.connect();
  }
  return client;
}

async function closeClient() {
  if (client) {
    await client.quit();
    client = null;
  }
}

process.on("exit", () => {
  console.log("here");
  closeClient().catch(console.error);
});

export { getClient, closeClient };
