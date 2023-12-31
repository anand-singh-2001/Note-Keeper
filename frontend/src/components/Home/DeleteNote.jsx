import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useNoteContext } from "../../hook/useNoteContext";
import { useState } from "react";
import Loading from "../Loading";

const DeleteNote = ({ currNote, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { deleteNotes } = useNoteContext();

  const handleDelete = async () => {
    setLoading(true);
    try {
      // console.log(currNote);
      await deleteNotes(currNote._id);
      setLoading(false);
      enqueueSnackbar("Note Deleted Successfully", { variant: "success" });
      onClose();
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.response.data.error, { variant: "error" });
      // console.log(error);
    }
  };
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center overflow-hidden"
      onClick={onClose}>
      <div
        className="lg:w-[400px] md:w-[400px] sm:w-[400px] xs:w-[250px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}>
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        <h1 className="text-3xl my-4 overflow-hidden">Delete Note</h1>

        <div className="flex flex-col items-center border-sky-400 rounded-xl  p-8 mx-auto">
          {loading ? (
            <Loading />
          ) : (
            <>
              <h3 className="text-2xl">
                Are you sure you want to delete this note.
              </h3>
              <button
                className="p-4 bg-red-600 text-white m-8 w-full"
                onClick={handleDelete}>
                Yes, Delete the note!
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteNote;

DeleteNote.propTypes = {
  currNote: PropTypes.node,
  onClose: PropTypes.ReactNode,
};
