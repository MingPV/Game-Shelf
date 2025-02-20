export default function MyRentalLoading() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center p-4 sm:p-6 rounded-lg gap-3 sm:gap-6 bg-black opacity-10 skeleton">
            <div className="w-full sm:w-[160px] h-[160px] bg-white sm:aspect-square opacity-20 rounded-lg"></div>
            <div className="flex flex-col w-full h-full">
                <div className="bg-white opacity-20 w-28 h-5 rounded-lg"></div>
                <div className="bg-white opacity-20 w-full h-5 rounded-lg mt-4"></div>
                <div className="bg-white opacity-20 w-full h-5 rounded-lg mt-2"></div>
                <div className="bg-white opacity-20 w-full h-5 rounded-lg mt-2"></div>
                <div className="bg-white opacity-20 w-full h-5 rounded-lg mt-2"></div>
            </div>
        </div>
    );
}
