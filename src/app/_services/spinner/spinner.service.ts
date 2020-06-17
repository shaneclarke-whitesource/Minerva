import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loadingSource = new BehaviorSubject<boolean>(false);
  isLoading = this.loadingSource.asObservable(); 

  constructor() { }
/**
 * @description Used to enable and disable the spinner which is used globally. 
 * @param isLoading boolean
 */
  changeLoadingStatus(isLoading: boolean) {
    this.loadingSource.next(isLoading);
  }
}  