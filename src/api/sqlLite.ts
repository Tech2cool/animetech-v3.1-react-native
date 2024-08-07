import {
  enablePromise,
  openDatabase,
  SQLError,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {Toast} from 'toastify-react-native';
const tableName = 'anime_watchList';

interface recordProps {
  id?: string | null;
  episodeIdGogo?: string | null;
  episodeIdAniwatch?: string | null;
  episodeIdAnilist?: string | null;
  english?: string | null;
  english_jp?: string | null;
  japanese?: string | null;
  episodeNum?: number | null;
  currentTime?: number | null;
  duration?: number | null;
  aniwatchId?: string | null;
  gogoId?: string | null;
  anilistId?: string | null;
  malId?: string | null;
  kitsuId?: string | null;
  timestamp?: string | null | number;
  wannaDelete?: boolean;
  provider?: string | null;
  animeImg?: string | null;
}
enablePromise(true);
export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  return new Promise((resolve, reject) => {
    openDatabase(
      {name: 'anime-MyList.db', location: 'default'},
      (db: SQLiteDatabase) => resolve(db),
      (error: SQLError) => reject(error),
    );
  });
};

// export const getDBConnection = async () => {
//   return openDatabase({name: 'anime-MyList.db', location: 'default'});
// };

export const createTable = async () => {
  const db = await getDBConnection();
  // create table if not exists
  const query = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id TEXT PRIMARY KEY,
      episodeIdGogo TEXT,
      episodeIdAniwatch TEXT,
      episodeIdAnilist TEXT,
      episodeNum TEXT,
      english TEXT,
      english_jp TEXT,
      japanese TEXT,
      animeImg TEXT,
      currentTime TEXT,
      duration TEXT,
      aniwatchId TEXT,
      gogoId TEXT,
      anilistId TEXT,
      malId TEXT,
      kitsuId TEXT,
      timestamp TEXT,
      wannaDelete TEXT,
      provider TEXT
    );
  `;

  await db.executeSql(query);
};

export const getManyItems = async () => {
  try {
    const db = await getDBConnection();
    const items: any[] = [];
    await createTable();
    const results = await db.executeSql(`SELECT * FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        items.push(result.rows.item(index));
      }
    });
    return items;
  } catch (error) {
    console.error(error);
    // throw Error('Failed to get items !!!');
  }
};
export const getOneItems = async (id: string, value: string | number) => {
  try {
    const db = await getDBConnection();
    const items: any[] = [];
    await createTable();
    const results = await db.executeSql(
      `SELECT * FROM ${tableName} where ${id} = ${value}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        items.push(result.rows.item(index));
      }
    });
    // console.log(results);
    return items;
  } catch (error) {
    console.error(error);
    // throw Error('Failed to get items !!!');
  }
};

export const saveVideoRecord = async (record: recordProps) => {
  const {id} = record;
  const db = await getDBConnection();
  try {
    await createTable();
    const results = await db.executeSql(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id],
    );

    if (results.length > 0) {
      if (results[0]?.rows.length > 0) {
        await updateQuery(record);
      } else {
        await insertQuery(record);
      }
    } else {
      await createTable();
    }
  } catch (error) {
    Toast.error('table not exist', 'top');
    await createTable();
  }
};

const insertQuery = async (record: recordProps) => {
  const {
    id,
    episodeIdGogo,
    animeImg,
    episodeIdAniwatch,
    episodeIdAnilist,
    english,
    english_jp,
    japanese,
    episodeNum,
    currentTime,
    duration,
    aniwatchId,
    gogoId,
    anilistId,
    malId,
    kitsuId,
    timestamp,
    wannaDelete,
    provider,
  } = record;
  const db = await getDBConnection();

  try {
    await createTable();
    // Insert new record
    const insertQuery = `INSERT OR REPLACE INTO ${tableName} 
  (id, episodeIdGogo, episodeIdAniwatch, episodeIdAnilist, english, english_jp, japanese, 
  episodeNum, currentTime, duration, aniwatchId, gogoId, anilistId, malId, kitsuId, timestamp, 
  wannaDelete, provider,animeImg) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const insertParams = [
      id,
      episodeIdGogo,
      episodeIdAniwatch,
      episodeIdAnilist,
      english,
      english_jp,
      japanese,
      episodeNum,
      currentTime,
      duration,
      aniwatchId,
      gogoId,
      anilistId,
      malId,
      kitsuId,
      timestamp,
      wannaDelete,
      provider,
      animeImg,
    ];

    // Execute the insert query
    await db.executeSql(insertQuery, insertParams);
    // console.log('Record inserted successfully');
  } catch (error: any) {
    Toast.error(error?.message, 'top');
  }
};

const updateQuery = async (record: recordProps) => {
  const {
    id,
    episodeIdGogo,
    animeImg,
    episodeIdAniwatch,
    episodeIdAnilist,
    english,
    english_jp,
    japanese,
    episodeNum,
    currentTime,
    duration,
    aniwatchId,
    gogoId,
    anilistId,
    malId,
    kitsuId,
    timestamp,
    wannaDelete,
    provider,
  } = record;
  const db = await getDBConnection();

  try {
    let updateQuery = `UPDATE ${tableName} SET`;
    const updateParams = [];

    // Build the SET clause dynamically based on defined fields
    const fieldsToUpdate = [
      {name: 'episodeIdGogo', value: episodeIdGogo},
      {name: 'episodeIdAniwatch', value: episodeIdAniwatch},
      {name: 'episodeIdAnilist', value: episodeIdAnilist},
      {name: 'english', value: english},
      {name: 'english_jp', value: english_jp},
      {name: 'japanese', value: japanese},
      {name: 'animeImg', value: animeImg},
      {name: 'episodeNum', value: episodeNum},
      {name: 'currentTime', value: currentTime},
      {name: 'duration', value: duration},
      {name: 'aniwatchId', value: aniwatchId},
      {name: 'gogoId', value: gogoId},
      {name: 'anilistId', value: anilistId},
      {name: 'malId', value: malId},
      {name: 'kitsuId', value: kitsuId},
      {name: 'timestamp', value: timestamp},
      {name: 'wannaDelete', value: wannaDelete},
      {name: 'provider', value: provider},
    ];

    const filteredFieldsToUpdate = fieldsToUpdate.filter(
      field => field.value !== undefined && field.value !== null,
    );

    filteredFieldsToUpdate.forEach((field, index) => {
      updateQuery += ` ${field.name} = ?`;
      updateParams.push(field.value);
      if (index < filteredFieldsToUpdate.length - 1) {
        updateQuery += ',';
      }
    });

    updateQuery += ` WHERE id = ?`;
    updateParams.push(id);

    // Execute the update query
    await db.executeSql(updateQuery, updateParams);
    // console.log('Record updated successfully');
  } catch (error: any) {
    Toast.error(error?.message, 'top');
  }
};

export const deleteOneItem = async (id: string, value: string | number) => {
  const db = await getDBConnection();

  const deleteQuery = `DELETE from ${tableName} where ${id} = ${value}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async () => {
  const db = await getDBConnection();

  const query = `drop table ${tableName}`;
  await createTable();

  await db.executeSql(query);
};
