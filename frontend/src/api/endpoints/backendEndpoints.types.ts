/* eslint-disable @typescript-eslint/no-namespace */
import {Entry} from "../../common/types";

export namespace BackendEndpoints {
  export namespace Entries {
    export interface GET {
      data: Entry[];
    }
  }
}
