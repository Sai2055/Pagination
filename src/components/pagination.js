import { useEffect, useState } from "react";

export default function Pagination() {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0); // ✅ added

  const itemsPerPage = 5;
  const skip = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data.products);
        setTotalProducts(data.total); // ✅ fixed
        console.log(data.products);
      });
  }, [currentPage]);

  const TotalPages = Math.ceil(totalProducts / itemsPerPage); // ✅ fixed

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="mt-10">pagination</div>
      <div className="text-center py-6">
        {apiData.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>

      {/* **********Button pagination ***************/}
      <div>
        <button
          className="border border-black px-3"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="border border-black px-3"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, TotalPages))
          }
          disabled={currentPage === TotalPages}
        >
          Next
        </button>
      </div>

      {/* *************************numbers pagination ****************** */}
      <div className="flex gap-6 mt-4">
        {[...Array(TotalPages)].map((_, index) => (
          <div
            key={index}
            className={`border px-2 cursor-pointer ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
