const updateFavList = async (updatedFavList: string[], tableID: string) => {
  try {
    const res = await fetch("/api/addFav", {
      method: "PUT",
      body: JSON.stringify({ favList: updatedFavList.toString(), id: tableID }),
      headers: { "Content-Type": "application/json" },
    });

    await res.json();
  } catch (err) {
    console.log(err);
  }
};

const addFav = (
  charID: string,
  tableID: string,
  favoriteList: string[],
  setFavList: (arr: any[]) => void
) => {
  let arr: any[] = favoriteList;
  let addArray: boolean = true;
  arr.map((item: any, key: number) => {
    if (item == charID) {
      arr.splice(key, 1);
      addArray = false;
    }
  });
  if (addArray) {
    arr.push(charID);
  }
  setFavList([...arr] as never[]);
  updateFavList(arr, tableID);
};

export { addFav };
