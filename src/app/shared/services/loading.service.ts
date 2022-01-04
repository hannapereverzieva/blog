import { BehaviorSubject } from 'rxjs';

export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  constructor() {}

  showSpinner() {
    this._loading.next(true);
  }

  hideSpinner() {
    this._loading.next(false);
  }
}
