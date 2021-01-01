import { useSelector } from "react-cloud-state";

export const useMainState = (fn) => {
  return useSelector((state) => fn(state.app.main));
};
