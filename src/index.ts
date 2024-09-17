/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Queue consumer: a Worker that can consume from a
 * Queue: https://developers.cloudflare.com/queues/get-started/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { WorkerEntrypoint, RpcTarget } from "cloudflare:workers";

interface Env {
  YOUR_QUEUE: Queue;
  JWT_SECRET: string;
}

class Article extends RpcTarget {
  id: number;
  env: any;

  constructor(id: number, env: Env) {
    super();

    // Note: Instance members like these are NOT exposed over RPC.
    // Only class (prototype) methods and properties are exposed.
    this.id = id;
    this.env = env;
  }

  add(a: number, b: number): number {
    console.log(this.env)
    return a + b;
  }

  async create() {

  }

  async update() {

  }

  async delete() {

  }

  async buildStatic() {
  }
}

export class ArticleService extends WorkerEntrypoint<{ Bindings: Env }> {
  async init(id: number, env: Env) {
    return {
      article: new Article(id, env)
    }
  }

}
export default class extends WorkerEntrypoint<{ Bindings: Env }> {
  async fetch(): Promise<Response> {
    return new Response("970 tasks");
  }

  add(a: number, b: number): number {
    console.log("start here:")
    console.log(this);
    return a + b;
  }
};
