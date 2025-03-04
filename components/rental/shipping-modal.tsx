import { Dispatch, SetStateAction } from "react";

export default function RentingShippingModal({ title, count, handleFunction, setShowModal } : { title: string, count: number, handleFunction: () => void, setShowModal: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center items-center">

            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white pb-2 px-2">
                    <div className="mt-5 text-center">
                        <h3 className="text-base font-semibold text-gray-900" id="modal-title">Confirm that your packages have been {title}?</h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">{count} boardgames in total</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex flex-row justify-center gap-6 mb-2">
                    <button type="button" className="inline-flex w-auto btn bg-gray-400 hover:bg-gray-400 border-none min-h-9 h-9 px-8" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="button" className="inline-flex w-auto btn bg-gs_purple_gradient hover:bg-opacity-60 border-none min-h-9 h-9 px-7" onClick={handleFunction}>Confirm</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}