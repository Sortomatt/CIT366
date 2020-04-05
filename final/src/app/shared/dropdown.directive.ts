import { Directive, HostListener, HostBinding} from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[App-dropDown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
