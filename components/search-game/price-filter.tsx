"use client";

export default function Filter({
  price,
  handleChange,
}: {
  price: [number, number];
  handleChange: Function;
}) {

  return (
    <div>
      <div onSelect={(e) => e.preventDefault()}>
        <div className="flex justify-between items-center gap-1">
          <p>price</p>
          <div className="text-center px-2 py-1">
            <input
              type="number"
              value={price[0].toString() ?? 0}
              min={0}
              max={1000}
              onChange={(e) => handleChange(e, "min")}
              className="w-16 py-1 px-2 bg-transparent border rounded text-center bg-slate-100 "
            />
          </div>
          <p>-</p>
          <div className="text-center px-2">
            <input
              type="number"
              value={price[1].toString() ?? 0}
              min={0}
              max={1000}
              onChange={(e) => handleChange(e, "max")}
              className="w-16 p-1 bg-transparent border rounded text-center bg-slate-100 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
