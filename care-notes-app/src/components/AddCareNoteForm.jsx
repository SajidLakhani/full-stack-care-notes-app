import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../redux/notesSlice";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const AddCareNoteForm = () => {
  const [residentName, setResidentName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!residentName || !authorName || !content) {
     
      toast.error("Please fill all fields!"); 
      return;
    }

    dispatch(addNote({ residentName, authorName, content, timestamp: Date.now() }));

    toast.success("Note added successfully!");

    // Clear form & close modal
    setResidentName("");
    setAuthorName("");
    setContent("");

    setIsModalOpen(false);
  };

  return (
    <div>
      {/*  Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Care Notes App</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200"
        >
          + Add Note
        </button>
      </nav>

     

      {/*  Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-[500px]">
            <h2 className="text-2xl font-bold mb-4">Add Care Note</h2>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {/*  Resident Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Resident Name</label>
                <input
                  type="text"
                  placeholder="Enter resident name"
                  value={residentName}
                  onChange={(e) => setResidentName(e.target.value)}
                  className="border p-2 w-full rounded-md"
                />
              </div>

              {/*  Author Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Author Name</label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="border p-2 w-full rounded-md"
                />
              </div>

              {/*  Care Note */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Care Note</label>
                <textarea
                  placeholder="Enter care note"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border p-2 w-full rounded-md h-24"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                
                    setResidentName("");
                    setAuthorName("");
                    setContent("");
                  }}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>

                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCareNoteForm;
