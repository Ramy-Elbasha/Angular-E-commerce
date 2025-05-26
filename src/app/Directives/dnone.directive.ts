import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDnone]',
})
export class DnoneDirective {
  constructor(public myref: ElementRef) {}
  @HostListener('click') click() {
    this.myref.nativeElement.parentElement.parentElement.remove();
  }
}
