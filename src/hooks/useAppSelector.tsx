import { type TypedUseSelectorHook, useSelector } from "react-redux";
import { type RootState } from "../redux/store.js";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;