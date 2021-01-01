import { CloudState } from "react-cloud-state";
import { State as MainState } from "module/main/type";

export interface RootState extends CloudState {
  app: {
    main: MainState;
  };
}
