import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ItemsService } from '../../Services/items.service';

@Component({
  selector: 'app-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  url = '';
  constructor(public router: Router, public itemservice: ItemsService) {
    this.url = router.url;
  }

  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() img: string = '';
  @Input() id: any = '';
  @Output() deleteitemEvent = new EventEmitter();

  deleteItem() {
    this.itemservice.deleteItemByID(this.id).subscribe();
    this.deleteitemEvent.emit(this.id);
  }
}
