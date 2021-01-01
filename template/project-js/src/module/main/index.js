import { Main } from "./component/Main";
import { registerModule } from "react-cloud-state";

const initialState = {};

const MainModule = registerModule("main", initialState, () => ({}));

export const actions = MainModule.getActions();

export { Main };
