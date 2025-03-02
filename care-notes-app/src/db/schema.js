import { appSchema, tableSchema } from '@nozbe/watermelondb';

// Define the schema
export const mySchema = appSchema({
  version: 1, // Change this when modifying schema
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
