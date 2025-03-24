import { Boardgame } from "@/app/types/game";
import { useEffect, useRef, useState } from "react";
import { UserData } from "@/app/types/user";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  createReviewAction,
  getMyUserData,
  selectUserById,
  updateProviderRating,
  updateRentalRequestRating,
} from "@/app/(user-pages)/actions";

export default function ReviewTag({
  initialScore,
  bg,
  rental_id,
}: {
  initialScore: number | null;
  bg: Boardgame;
  rental_id: number;
}) {
  const [score, setScore] = useState(initialScore);
  const [openDialog, setOpenDialog] = useState(false);
  const [rating, setRating] = useState(5);
  const [myData, setMyData] = useState<UserData>();
  const [isSending, setIsSending] = useState(false);
  const [comment, setComment] = useState("");

  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 120)}px`; // Recalculate height
    }
  };

  useEffect(() => {
    // Adjust height on window resize
    const fetchMyData = async () => {
      const fetchData = await getMyUserData();
      setMyData(fetchData);
      console.log(fetchData);
    };

    fetchMyData();
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  const makeReview = async () => {
    if (!myData) {
      router.push("/sign-in");
      return;
    }

    if (!myData) {
      return;
    }

    setOpenDialog(false);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#359368",
      cancelButtonColor: "#FF2525",
      confirmButtonText: "Yes",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsSending(true);

        const { data, error } = await createReviewAction(
          myData.uid,
          bg.provider_id,
          comment,
          rating,
          bg.id,
          rental_id
        );

        if (!error) {
          setIsSending(false);
          setOpenDialog(false);

          await updateRentalRequestRating(rental_id, rating);

          const fetchedProvider = await selectUserById(bg.provider_id);
          await updateProviderRating(
            bg.provider_id,
            rating,
            fetchedProvider[0].rating,
            fetchedProvider[0].rating_count
          );
        } else {
          setIsSending(false);
          Swal.fire({
            title: "This boardgame is not available!",
            text: "Please try again later.",
            icon: "error",
            customClass: {
              popup: "custom-swal-popup",
              title: "custom-swal-title",
              confirmButton: "custom-swal-confirm-button",
            },
          }).then(() => {
            // Close the modal
          });
          return;
        }

        Swal.fire({
          title: "Reviewed",
          text: "Review was sent!",
          icon: "success",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        }).then(() => {
          // Close the modal
          setScore(rating);
        });
      }
    });
  };

  return !score ? (
    <>
      <button
        className="btn bg-gs_purple_gradient hover:bg-opacity-60 border-none min-h-7 h-7 my-1"
        onClick={() => setOpenDialog(true)}
      >
        <span className="flex">
          Review<span className="hidden sm:block pl-1">this boardgame</span>
        </span>
      </button>
      <dialog open={openDialog} className="modal">
        <div className="fixed inset-0 flex items-center justify-center bg-black/50"></div>
        <div className="modal-box bg-slate-50 w-1/2 md:w-full flex flex-col text-black space-y-3 shadow-none items-center">
          <p className="font-bold text-lg md:text-xl lg:text-2xl py-3">
            Rate this Board game
          </p>

          <div className="flex flex-col lg:flex-row space-y-2 md:space-y-0 pb-4">
            <img
              src={bg.bg_picture}
              alt={bg.bg_name}
              className="rounded-xl w-full self-center object-contain max-w-48 h-fit md:w-2/5 lg:w-1/2 md:max-w-full"
            />
            <div className="flex flex-col space-y-2 md:space-y-3 md:ml-6 lg:space-y-4">
              <div className="flex flex-col">
                <p className="font-semibold text-sm md:text-base lg:text-lg">
                  {bg.bg_name}
                </p>
                <p className="text-black/50 text-xs md:text-sm">
                  {bg.description}
                </p>
              </div>
              <div className="flex flex-col text-sm md:text-base lg:text-lg">
                <p>Rating</p>
                <div className="flex flex-row rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <input
                      key={star}
                      type="radio"
                      className="mask mask-star-2 bg-yellow-400"
                      checked={rating === star}
                      onChange={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm ">
                Price :{" "}
                <span className="text-sm text-lime-600 font-bold">
                  {bg.price}
                </span>{" "}
                Bath/Day
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 w-full pb-4">
            <p className="w-28">comment :</p>
            <textarea
              ref={textareaRef}
              className="input rounded-none bg-slate-50 border border-gray-400 w-full focus:border-current resize-none overflow-hidden"
              rows={1}
              value={comment}
              onChange={(e) => {
                adjustHeight();
                setComment(e.target.value);
              }}
            ></textarea>
          </div>

          <div className="w-full flex flex-row justify-between text-white h-9 gap-4 my-6">
            <button
              onClick={() => setOpenDialog(false)}
              className="w-1/2 border rounded-xl bg-red-500"
            >
              cancel
            </button>
            <button
              className="w-1/2 border rounded-xl bg-green-500"
              onClick={() => makeReview()}
            >
              confirm
            </button>
          </div>
        </div>
      </dialog>
    </>
  ) : (
    <div className="rating">
      <input
        type="radio"
        className="mask mask-star-2 bg-yellow-400"
        checked={score == 1}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-star-2 bg-yellow-400"
        checked={score == 2}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-star-2 bg-yellow-400"
        checked={score == 3}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-star-2 bg-yellow-400"
        checked={score == 4}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-star-2 bg-yellow-400"
        checked={score == 5}
        readOnly
      />
    </div>
  );
}
