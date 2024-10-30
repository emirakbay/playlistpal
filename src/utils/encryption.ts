import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from "crypto";
import { promisify } from "util";
import { gunzip, gzip } from "zlib";

const gzipAsync = promisify(gzip);
const gunzipAsync = promisify(gunzip);

const algorithm = "aes-256-cbc";
const key = scryptSync(
  process.env.ENCRYPTION_KEY!,
  process.env.ENCRYPTION_SALT!,
  32,
);

export async function encrypt(text: string): Promise<string> {
  const compressedData = await compress(text);
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(compressedData),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export async function decrypt(encryptedText: string): Promise<string> {
  const [ivHex, encryptedDataHex] = encryptedText.split(":");
  const decipher = createDecipheriv(
    algorithm,
    key,
    Buffer.from(ivHex ?? "", "hex"),
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedDataHex ?? "", "hex")),
    decipher.final(),
  ]);
  return await decompress(decrypted);
}

async function compress(data: string): Promise<Buffer> {
  return await gzipAsync(data);
}

async function decompress(buffer: Buffer): Promise<string> {
  const decompressedBuffer = await gunzipAsync(buffer);
  return decompressedBuffer.toString("utf8");
}
