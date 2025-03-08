import HeartButton from "./heart-button";

export default function GameDetailLoading() {
    return (
        <div className="opacity-30 flex flex-col md:flex-row w-[90%] space-y-10 md:space-x-10 lg:space-x-20 justify-center self-center">
            <div className="skeleton flex flex-col p-4 md:p-6 lg:p-10 bg-white/10 rounded-xl items-center justify-between gap-3 lg:gap-6 w-80 self-center lg:w-96 h-[65vh]">
                <div className="w-4/5 h-3/5 bg-black/20 md:w-[90%] rounded-xl" />

                <div className="space-y-1 w-full">
                    <div className="flex flex-row justify-between text-sm md:text-base text-gs_white/50 w-full opacity-20">
                        <p className="bg-white rounded-xl">name</p>
                        <p className="bg-white rounded-xl">baht / day</p>
                    </div>

                    <div className="flex flex-row justify-between text-lg md:text-xl lg:text-2xl font-semibold text-gs_white w-full gap-10 opacity-20">
                        <p className="bg-white rounded-xl">boardgame</p>
                        <p className="bg-white rounded-xl">price</p>
                    </div>
                </div>

                <div className="flex flex-row w-full gap-2">
                    <HeartButton
                        filled={false}
                        onChange={() => { }}
                    />
                    <button
                        className="w-full font-semibold text-sm px-4 rounded-xl py-2 self-end bg-white opacity-20"
                        disabled={true}
                    >
                        Rent
                    </button>
                </div>
                <p className="self-end bg-white rounded-xl opacity-20">out of stock</p>
            </div>
            <div className="skeleton bg-transparent w-[90%] md:w-1/2 h-fit flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
                <div className="space-y-1">
                    <p className="text-sm md:text-base rounded-xl w-fit bg-white opacity-20">Board Game Name</p>
                    <p className="text-2xl md:text-4xl font-bold w-fit opacity-20 bg-white rounded-xl">boardgame name</p>
                </div>

                <div className="flex text-sm md:text-base flex-wrap w-full gap-2">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="py-1 px-2 rounded-lg bg-white opacity-20">
                            {`type${index}`}
                        </div>
                    ))}
                </div>

                <div>
                    <p className="text-sm md:text-base text-gs_white/50 mb-2 w-fit bg-white opacity-20 rounded-xl">Store</p>
                    <div className="flex flex-row items-center gap-3 opacity-20">
                        <div className="w-12 h-12 rounded-full bg-white"/>
                        <p className="text-md md:text-lg lg:text-xl font-bold bg-white rounded-xl">
                            provider
                        </p>
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="text-sm md:text-base text-gs_white/50 w-fit opacity-20 bg-white rounded-xl">Detail</p>
                    <p className="text-md md:text-lg bg-white opacity-20 rounded-xl w-fit">Lorem ipsum odor amet, consectetuer adipiscing elit.</p>
                </div>
            </div>
        </div>
    )
}