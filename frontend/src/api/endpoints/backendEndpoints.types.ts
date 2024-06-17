/* eslint-disable @typescript-eslint/no-namespace */
import { Entry, EntryType } from '../../common/types';

export namespace BackendEndpoints {
  export namespace Entries {
    export interface GET {
      data: Entry[];
    }

    export namespace POST {
      export interface Payload {
        type: EntryType;
        runTime: string;
        runDistance: number;
        comment: string | null;
      }
    }
  }

  export namespace Auth {
    export interface POST {
      data: {
        token: string;
      };
    }
  }
}
