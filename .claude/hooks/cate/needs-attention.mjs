/**
 * Claude Code Notification hook — sends a cate.v1.needsAttention event
 * to the Leftenant MCP bridge when Claude needs user attention.
 *
 * Triggered by: permission_prompt, idle_prompt notifications
 * Env vars required: TAB_ID, LEFTENANT_SOCKET
 * Protocol: NDJSON over Unix socket (adapter-request)
 */

import { createConnection } from 'node:net';
import { randomUUID } from 'node:crypto';

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => (input += chunk));
process.stdin.on('end', () => {
  const tabId = process.env.TAB_ID;
  const socketPath = process.env.LEFTENANT_SOCKET;
  if (!tabId || !socketPath) {
    process.exit(0);
  }

  let parsed;
  try {
    parsed = JSON.parse(input);
  } catch {
    process.exit(0);
  }

  const conn = createConnection(socketPath, () => {
    const request = JSON.stringify({
      type: 'adapter-request',
      id: randomUUID(),
      method: 'tellCate',
      params: {
        tabId,
        type: 'cate.v1.needsAttention',
        body: {
          notificationType: parsed.notification_type || '',
          message: parsed.message || '',
        },
      },
    });
    conn.write(request + '\n');
    conn.end();
  });

  conn.on('error', () => {
    process.exit(0);
  });
});
