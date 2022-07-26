import * as SQLite from 'expo-sqlite';
const dbName = 'database.db';

const conectionDb = {
    getConnection: () => {
        return SQLite.openDatabase(dbName);
  
        
    }
};

export default conectionDb;
