import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchNotes } from "../redux/notesSlice";

const CareNotesList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const [isListView, setIsListView] = useState(false);

  //  Polling API every 60 seconds
  useEffect(() => {
    // Initial fetch
    dispatch(fetchNotes());

    const interval = setInterval(() => {
      dispatch(fetchNotes());
    }, 60000); // 60 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [dispatch]);

  return (
    <div className="p-6">
      {/* Hide toggle when no notes are available */}
      {notes.length > 0 && (
        <div className="flex items-center mb-4">
          <span className="mr-2">Grid View</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isListView}
              onChange={() => setIsListView(!isListView)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <span className="ml-2">List View</span>
        </div>
      )}

      {/* Notes List */}
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes available.</p>
      ) : isListView ? (
        //  List View (Table)
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Resident Name</th>
              <th className="border p-2 text-left">Author Name</th>
              <th className="border p-2 text-left">Date & Time</th>
              <th className="border p-2 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id} className="border">
                <td className="border p-2 font-bold">{note.residentName}</td>
                <td className="border p-2">{note.authorName}</td>
                <td className="border p-2">
                  {note.timestamp ? new Date(note.timestamp).toLocaleString() : "No Date"}
                </td>
                <td className="border p-2">{note.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        //  Grid View (Cards)
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div key={note.id} className="p-4 border rounded-lg shadow-lg bg-white">
              <h1 className="text-xl font-bold text-blue-600">{note.residentName}</h1>
              <p className="text-gray-700">
                <span className="font-semibold">{note.authorName}</span> 
                <span className="text-gray-500 text-sm"> ({new Date(note.timestamp).toLocaleString()})</span>
              </p>
              <p className="mt-2 text-gray-800">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareNotesList;
