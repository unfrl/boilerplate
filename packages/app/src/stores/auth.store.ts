import { makeAutoObservable } from 'mobx';

export class AuthStore {
  public authenticated: boolean = true;

  public toggleAuthenticated = () => {
    this.authenticated = !this.authenticated;
  };

  public constructor() {
    makeAutoObservable(this);
  }
}

export const authStore = new AuthStore();
