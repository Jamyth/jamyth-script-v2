import { {1} } from './component/Main';
import { register, Module } from 'react-cloud-state';

const initialState = {};

class {1}Module extends Module {
    onEnter() {
        // todo 
    }
}
const {2}Module = register(new {1}Module("{2}", initialState));
export const actions = {2}Module.getActions();
export const Main = {2}Module.attachLifecycle({1})