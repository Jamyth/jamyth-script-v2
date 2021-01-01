import {useSelector} from 'react-cloud-state';
import {RootState} from 'util/type';

export const use{1}State = <T>(fn: (state: RootState['app']['{2}']) => T): T => {
    return useSelector((state: RootState) => fn(state.app.{2}))
}