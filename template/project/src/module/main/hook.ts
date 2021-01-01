import { RootState } from "util/type";
import { useSelector } from "react-cloud-state";

export const useMainState = <T>(
  fn: (state: RootState["app"]["main"]) => T
): T => {
  return useSelector((state: RootState) => fn(state.app.main));
};
