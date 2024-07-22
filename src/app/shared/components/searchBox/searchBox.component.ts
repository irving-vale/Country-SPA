import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-Box',
  templateUrl: './searchBox.component.html',
})
export class SearchBoxComponent  {


  @Input()
  public placeholder: string = '';

  @Input()
  public inputValueStorage:string ='';

  @Output()
  public oneValue: EventEmitter<string> = new EventEmitter<string>();

  public emitValue (value: string): void {
    this.oneValue.emit(value);
  }

}
