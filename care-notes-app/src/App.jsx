
import AddCareNoteForm from "./components/AddCareNoteForm";
import CareNotesList from "./components/CareNotesList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
       <ToastContainer position="top-right" autoClose={2000}  />
      <AddCareNoteForm />
      <CareNotesList /> 
    </div>
  );
};

export default App;
