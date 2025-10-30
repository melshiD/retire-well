import { Service } from '@liquidmetal-ai/raindrop-framework';
import { Env } from './raindrop.gen';

export default class extends Service<Env> {
  async fetch(_request: Request): Promise<Response> {
    return new Response('Request received');
  }
}
