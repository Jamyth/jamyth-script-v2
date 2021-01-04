import { Main as MainComponent } from "./component/Main";
import { register, Module } from "react-cloud-state";
import { RootState } from "util/type";
import { State } from "./type";

const initialState: State = {};

class MainModule extends Module<RootState, "main"> {
  onEnter() {
    //todo
  }
}

const mainModule = register(new MainModule("main", initialState));
export const actions = mainModule.getActions();
export const Main = mainModule.attachLifecycle(MainComponent);
