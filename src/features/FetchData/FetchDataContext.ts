import { createContext } from "react";
import { Data } from "../../Types/types";

const FetchDataContext = createContext<Data>({} as Data);

export default FetchDataContext;
