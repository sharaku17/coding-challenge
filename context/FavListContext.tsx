import { createContext, ReactNode, SetStateAction, useState } from "react";

export type favListContextType = {
  favoriteList: string[];
  setFavList: (arr: string[]) => void;
  tableID: string;
  setTableID: (id: string) => void;
};

type Props = {
  children: ReactNode;
};

const favListContextDefaultValues: favListContextType = {
  favoriteList: [],
  setFavList: () => {},
  tableID: "",
  setTableID: () => {},
};
const FavListContext = createContext<favListContextType>(
  favListContextDefaultValues
);

const FavListProvider = ({ children }: Props) => {
  const [favoriteList, setFavlist] = useState([]);
  const [tableID, setTableID] = useState("");

  const setFavList = (arr: any) => {
    setFavlist(arr);
  };

  const value = { favoriteList, setFavList };

  return (
    <FavListContext.Provider
      value={{ favoriteList, setFavList, tableID, setTableID }}
    >
      {children}
    </FavListContext.Provider>
  );
};

export { FavListContext, FavListProvider };
//export type { favListContextType };
