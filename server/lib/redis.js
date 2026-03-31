import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
  tls: {},
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on("connect", () => {
  console.log("🔌 Redis conectado correctamente");
});

redis.on("error", (err) => {
  console.error("Error en Redis:", err);
});

redis.on("reconnecting", () => {
  console.log("Reintentando conexión a Redis...");
});

// 🧪 TEST AUTOMÁTICO DE CONEXIÓN
(async () => {
  try {
    await redis.set("test:redis", "OK");
    const value = await redis.get("test:redis");
    console.log("🟢 Test Redis →", value);
  } catch (err) {
    console.error("❌ Error en test Redis:", err);
  }
})();

export default redis;
