import { {1} as Main } from './component/Main';
import { registerModule } from 'react-cloud-state';

const initialState = {};

const {1}Module = registerModule("{2}", initialState, () => ({}));

export const actions = {1}Module.getActions();
export {Main}