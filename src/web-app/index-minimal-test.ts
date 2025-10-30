/**
 * Minimal test service to isolate timeout issue
 */
import { Service } from '@liquidmetal-ai/raindrop-framework';
import { Env } from './raindrop.gen';

export default class extends Service<Env> {
  async fetch(request: Request): Promise<Response> {
    return new Response(JSON.stringify({ status: 'ok', message: 'Minimal test working!' }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
