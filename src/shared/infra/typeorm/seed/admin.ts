import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO users (id, name, username, password, "isAdmin") 
      values ('${id}', 'Admin', 'admin', '${password}', true)`,
  );

  connection.close();
}

create().then(() => console.log('User admin created.'));
