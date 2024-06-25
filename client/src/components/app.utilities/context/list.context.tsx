import { createContext, useState } from "react";
import { MiniProfile } from "../../../pages/home/interfaces/profile.interfaces";


const ListInitial: MiniProfile[] = [];

export const ListContext = createContext<{
  matchaList: MiniProfile[];
  setMatchaList: React.Dispatch<React.SetStateAction<MiniProfile[]>>;
  viewerList: MiniProfile[];
  setViewerList: React.Dispatch<React.SetStateAction<MiniProfile[]>>;
  likerList: MiniProfile[];
  setLikerList: React.Dispatch<React.SetStateAction<MiniProfile[]>>;
  matchList: MiniProfile[];
  setMatchList: React.Dispatch<React.SetStateAction<MiniProfile[]>>;
  visitedList: MiniProfile[];
  setVisitedList: React.Dispatch<React.SetStateAction<MiniProfile[]>>;
  likedList: MiniProfile[];
  setLikedList: React.Dispatch<React.SetStateAction<MiniProfile[]>>;
  bannedList: MiniProfile[];
  setBannedList: React.Dispatch<React.SetStateAction<MiniProfile[]>>;
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
  const [matchaList, setMatchaList] = useState<MiniProfile[]>(ListInitial);
  const [viewerList, setViewerList] = useState<MiniProfile[]>(ListInitial);
  const [likerList, setLikerList] = useState<MiniProfile[]>(ListInitial);
  const [matchList, setMatchList] = useState<MiniProfile[]>(ListInitial);
  const [visitedList, setVisitedList] = useState<MiniProfile[]>(ListInitial);
  const [likedList, setLikedList] = useState<MiniProfile[]>(ListInitial);
  const [bannedList, setBannedList] = useState<MiniProfile[]>(ListInitial);
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
