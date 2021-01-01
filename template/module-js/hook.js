import { useSelector } from 'react-cloud-state';

export const use{1}State = (fn) => {
    return useSelector(state => fn(state.app.{2}));
}