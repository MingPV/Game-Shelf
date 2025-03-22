import { Dispatch, SetStateAction } from "react";
import { addImagetoRentalRequest } from "@/app/(rental-pages)/actions";
import { useState } from "react";

export default function MyRentalModal({
  tag,
  request_id,
  setShowModal,
  setTag,
}: {
  tag: string;
  request_id: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setTag: Dispatch<SetStateAction<string>>;
}) {
  const [img, setImg] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (img == null) return;

    setShowModal(false);
    
    if (tag == "before_ship" || tag == "after_return") setTag("done");

    await addImagetoRentalRequest(img, tag, request_id);
    if (tag == "after_ship") setTag("before_return");
    else if (tag == "before_return") setTag("");
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={() => setShowModal(false)} 
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center">
          <form 
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white pb-2 px-2">
              <div className="mt-5 text-center">
                <div className="text-black mb-4 font-bold">
                  Add the boardgame image
                </div>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="file-input file-input-primary"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0])
                      setImg(e.target.files[0]);
                  }}
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex flex-row justify-center gap-6 mb-2">
              <button
                type="button"
                className="inline-flex w-auto btn bg-gray-400 hover:bg-gray-400 border-none min-h-9 h-9 px-8"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex w-auto btn bg-gs_purple_gradient hover:bg-opacity-60 border-none min-h-9 h-9 px-7"
                onClick={() => handleSubmit()}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
