import { createContext, useState } from "react";

export type ListType = {
  id: number;
  username: string;
  birthdate: string;
  region: string;
  gender: string;
  orientation: string;
  title: string;
  popularity: number;
  photo: string;
  lastConnection: string;
};

const ListInitial: ListType[] = [];

export const ListContext = createContext<{
  matchaList: ListType[];
  setMatchaList: React.Dispatch<React.SetStateAction<ListType[]>>;
  viewerList: ListType[];
  setViewerList: React.Dispatch<React.SetStateAction<ListType[]>>;
  likerList: ListType[];
  setLikerList: React.Dispatch<React.SetStateAction<ListType[]>>;
  matchList: ListType[];
  setMatchList: React.Dispatch<React.SetStateAction<ListType[]>>;
  visitedList: ListType[];
  setVisitedList: React.Dispatch<React.SetStateAction<ListType[]>>;
  likedList: ListType[];
  setLikedList: React.Dispatch<React.SetStateAction<ListType[]>>;
  bannedList: ListType[];
  setBannedList: React.Dispatch<React.SetStateAction<ListType[]>>;
}>({
  matchaList: ListInitial,
  setMatchaList: () => {},
  viewerList: ListInitial,
  setViewerList: () => {},
  likerList: ListInitial,
  setLikerList: () => {},
  matchList: ListInitial,
  setMatchList: () => {},
  visitedList: ListInitial,
  setVisitedList: () => {},
  likedList: ListInitial,
  setLikedList: () => {},
  bannedList: ListInitial,
  setBannedList: () => {},
});


export const ListProvider = ({ children }: { children: React.ReactNode }) => {
  const [matchaList, setMatchaList] = useState<ListType[]>(ListInitial);
  const [viewerList, setViewerList] = useState<ListType[]>(ListInitial);
  const [likerList, setLikerList] = useState<ListType[]>(ListInitial);
  const [matchList, setMatchList] = useState<ListType[]>(ListInitial);
  const [visitedList, setVisitedList] = useState<ListType[]>(ListInitial);
  const [likedList, setLikedList] = useState<ListType[]>(ListInitial);
  const [bannedList, setBannedList] = useState<ListType[]>(ListInitial);
  return (
    <ListContext.Provider
      value={{
        matchaList,
        setMatchaList,
        viewerList,
        setViewerList,
        likerList,
        setLikerList,
        matchList,
        setMatchList,
        visitedList,
        setVisitedList,
        likedList,
        setLikedList,
        bannedList,
        setBannedList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
