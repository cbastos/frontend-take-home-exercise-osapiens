import { makeAutoObservable, runInAction } from "mobx";
import { ActionResultStatus } from "../../../types/global";
import { resultOrError } from "../../../utils/global";

export interface User {
  firstName?: string;
  lastName?: string;
  eMail?: string;
}

export default class UserStore {
  user: User | null = null;

  // init function
  constructor() {
    makeAutoObservable(this);
  }

  // actions
  async getOwnUser() {
    const [result, error] = await resultOrError(
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              firstName: "Aria",
              lastName: "Test",
              eMail: "linda.bolt@osapiens.com"
            }),
          500
        )
      )
    );

    if (!!error) {
      return {
        status: ActionResultStatus.ERROR,
        error,
        knownErrors: {}
      };
    }

    if (result) {
      runInAction(() => {
        this.user = result;
      });

      return {
        status: ActionResultStatus.SUCCESS,
        result: result
      };
    }

    return {
      status: ActionResultStatus.ERROR,
      error: "Something went wrong.",
      knownErrors: {}
    };
  }
}
