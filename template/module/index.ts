import { {1} as Main } from './component/Main';
import { registerModule } from 'react-cloud-state';
import { RootState } from 'util/type';
import { State } from './type';

const initialState: State = {};

const {1}Module = registerModule<RootState, "{2}">("{2}", initialState, () => ({}));

export const actions = {1}Module.getActions();

export { Main }
