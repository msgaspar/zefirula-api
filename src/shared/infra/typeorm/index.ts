import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'postgres'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    }),
  );
};
