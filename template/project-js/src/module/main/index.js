import { Main as MainComponent } from "./component/Main";
import { register, Module } from "react-cloud-state";

const initialState = {};

class MainModule extends Module {
  onEnter() {
    // todo
  }
}

const mainModule = register(new MainModule("main", initialState));
export const actions = mainModule.getActions();
export const Main = mainModule.attachLifecycle(MainComponent);
