import { Main } from "./component/Main";
import { registerModule } from "react-cloud-state";
import { RootState } from "util/type";
import { State } from "./type";

const initialState: State = {};

const MainModule = registerModule<RootState, "main">(
  "main",
  initialState,
  () => ({})
);

export const actions = MainModule.getActions();
export { Main };
