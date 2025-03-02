import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'; // ✅ Use LokiJS for browser storage
import { Model } from '@nozbe/watermelondb';
import { appSchema, tableSchema } from '@nozbe/watermelondb';

// ✅ Define Schema
const careNotesSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'notes',
      columns: [
        { name: 'resident_name', type: 'string' },
        { name: 'author_name', type: 'string' },
        { name: 'content', type: 'string' },
        { name: 'timestamp', type: 'number' },
      ],
    }),
  ],
});

class CareNote extends Model {
  static table = 'notes';

  static associations = {};

  static fields = {
    residentName: { type: 'string', name: 'resident_name' },
    authorName: { type: 'string', name: 'author_name' },
    content: { type: 'string', name: 'content' },
    timestamp: { type: 'number', name: 'timestamp' },
  };
}



// ✅ Use LokiJS with Required Options
const adapter = new LokiJSAdapter({
  dbName: 'careNotesDB',
  schema: careNotesSchema,
  useWebWorker: false,
  useIncrementalIndexedDB: true, // ✅ Fixes previous LokiJS warning
  onQuotaExceededError: (error) => console.error("Storage quota exceeded:", error),
});

const database = new Database({
  adapter,
  modelClasses: [CareNote],
  actionsEnabled: true,
});

export { database, CareNote };
