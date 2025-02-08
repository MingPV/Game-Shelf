export default function BoardGameCard({name, picture, price, description, status}:
    {name: string, picture: string, price: number, description: string, status: string}) {

    const statusClass = status === 'available' ? 'bg-green-500' : 'bg-orange-500';

    return (
        <div className="card card-side shadow-xl border-white border-[1px] m-5 h-[250px] relative">
            <img
                src={picture}
                alt="boardgame picture" 
                className="object-cover rounded-xl m-3 w-1/3"
            />
            <div className="card-body flex flex-col">
                <p className="text-2xl font-semibold">{name}</p>
                <button className={`absolute top-0 right-0 mt-5 mr-10 rounded px-5 py-2 ${statusClass}`}>
                    {status}
                </button>
                <p>type: </p>
                <p>price: {price}</p>
                <p>{description}</p>
                <div className="flex justify-end mt-auto">
                    <button className="absolute bottom-0 right-0 mb-5 mr-10 bg-emerald-600 rounded px-5 py-2 hover:bg-emerald-700">edit condition or details</button>
                </div>
            </div>
        </div>
    );
}