import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../db/watermelonDB';

//  API Base URL
const API_URL = import.meta.env.VITE_API_URL;

//  Fetch Notes from Backend & Sync with WatermelonDB
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  try {
    //  Fetch from Backend API
    const response = await fetch(API_URL);
    const backendNotes = await response.json();

    //  Sync API Data with WatermelonDB (Offline Storage)
    await database.write(async () => {
      const notesCollection = database.get('notes');

      for (const note of backendNotes) {
        const existingNote = await notesCollection.find(note.id).catch(() => null);

        if (!existingNote) {
          await notesCollection.create(newNote => {
            newNote._raw.id = note.id;
            newNote._raw.resident_name = note.residentName;
            newNote._raw.author_name = note.authorName;
            newNote._raw.content = note.content;
            newNote._raw.timestamp = note.timestamp;
          });
        }
      }
    });

    return backendNotes.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.log(" Error fetching from API, using offline data:", error);

    //  Fallback to WatermelonDB (Offline Mode)
    const notesCollection = database.get('notes');
    const notes = await notesCollection.query().fetch();

    return notes.map(note => ({
      id: note.id,
      residentName: note._raw.resident_name || "Unknown",
      authorName: note._raw.author_name || "Unknown",
      content: note._raw.content || "No Content",
      timestamp: note._raw.timestamp || 0,
    })).sort((a, b) => b.timestamp - a.timestamp);
  }
});

//  Add Note to Backend & WatermelonDB
export const addNote = createAsyncThunk('notes/addNote', async (noteData) => {
  try {
    //  Send to Backend API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });

    const newNote = await response.json();
    console.log("Note added to API:", newNote);

    //  Store in WatermelonDB for offline access
    await database.write(async () => {
      await database.get('notes').create(note => {
        note._raw.id = newNote.note.id;
        note._raw.resident_name = newNote.note.residentName;
        note._raw.author_name = newNote.note.authorName;
        note._raw.content = newNote.note.content;
        note._raw.timestamp = newNote.note.timestamp;
      });
    });

    //  Return new note to directly update Redux state
    return {
      id: newNote.note.id,
      residentName: newNote.note.residentName,
      authorName: newNote.note.authorName,
      content: newNote.note.content,
      timestamp: newNote.note.timestamp,
    };
  } catch (error) {
    console.error(" Error adding note to API:", error);
    throw error;
  }
});

//  Notes Slice
const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.unshift(action.payload); //  Directly add new note to Redux state
      });
  },
});

export default notesSlice.reducer;
