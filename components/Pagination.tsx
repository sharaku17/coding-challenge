import React from "react";

const Pagination = ({
  characterData,
  characterPage,
  setCharacterPage,
}: any) => {
  return (
    <div className="flex justify-between w-full px-4 md:col-span-3 ">
      <button
        className="disabled:text-gray-400"
        type="button"
        disabled={characterPage === 1}
        onClick={() => setCharacterPage(characterPage - 1)}
      >
        Prev Page
      </button>
      <span>{`current page: ${characterPage}`} </span>
      <button
        className="disabled:text-gray-400"
        type="button"
        disabled={characterPage === characterData?.characters?.info?.pages}
        onClick={() => setCharacterPage(characterPage + 1)}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
