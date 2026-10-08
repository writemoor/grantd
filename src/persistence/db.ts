import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
export const dataDir = process.env.GRANTD_DATA_DIR || path.join(process.cwd(), 'data');
let connection: DatabaseSync | undefined;
export function db() {
  if (!connection) {
    mkdirSync(path.join(dataDir, 'uploads'), { recursive: true });
    connection = new DatabaseSync(path.join(dataDir, 'grantd.sqlite'));
    connection.exec('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;');
    connection.exec(readFileSync(path.join(process.cwd(), 'src/persistence/schema.sql'), 'utf8'));
    connection.prepare('INSERT OR IGNORE INTO organization VALUES (?,?)').run('demo-org','Community Arts Collective');
    const seed = connection.prepare('INSERT OR IGNORE INTO users VALUES (?,?,?,?)');
    seed.run('demo-user','demo-org','Alex Morgan','Development');
    seed.run('finance-user','demo-org','Jordan Lee','Finance');
    seed.run('program-user','demo-org','Sam Rivera','Programs');
  }
  return connection;
}
