import 'reflect-metadata';
import { Connection, createConnection, getConnection } from 'typeorm';
import ORMConfig from '../ormconfig';

export const DBConnect = async () => {
  let connection: Connection | undefined;
  try {
    connection = getConnection();
  } catch (e) {
    console.error(e.message);
  }

  try {
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();
      }
    } else {
      await createConnection(ORMConfig);
    }
    console.log('Database connect!');
  } catch (e) {
    console.error('Database connection failed!', e);
    throw e;
  }
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const TryDBConnect = async (onError: Function, next?: Function) => {
  try {
    await DBConnect();
    if (next) {
      next();
    }
  } catch (e) {
    onError();
  }
};
