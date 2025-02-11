export default function Skeleton() {
    return (
        <>
            <div className="card shadow-xl m-5 p-5 relative flex flex-row border-[1px] border-gs_white/20">
                <div className="skeleton bg-gs_white/20 h-auto w-1/3 rounded-lg"></div>
                <div className="flex flex-col p-2 w-2/3 h-auto">
                    <div className="skeleton bg-gs_white/20 h-8 w-1/3 rounded-lg m-2"></div>
                    <div className="skeleton bg-gs_white/20 h-8 w-full rounded-lg m-2"></div>
                    <div className="skeleton bg-gs_white/20 h-8 w-full rounded-lg m-2"></div>
                </div>
            </div>
        </>
    );
}