import { Component, EventEmitter, Output } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { ItemsService } from '../../Services/items.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [ItemComponent, ReactiveFormsModule],
  providers: [ItemsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  pageindex = 0;
  pagesnum = 0;
  pageitems: any = [];
  pagearr: any = [];
  items: any = [];
  filteredItems: any = [];
  category = new FormControl('');
  search = new FormControl('');

  constructor(public itemserive: ItemsService, public router: Router) {}
  ngOnInit() {
    this.itemserive.getallitems().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = data;
        this.pagesnum = Math.ceil(this.filteredItems.length / 12);
        this.pagearr = Array.from({ length: this.pagesnum }, (_, i) => i + 1);
        this.pagecontrol(1);
      },
      error: (err) => console.log(err),
    });
  }
  filteritemsbycat(e: any) {
    let cat = e.target.value;
    this.search.setValue('');
    if (cat) {
      this.filteredItems = this.items.filter(
        (item: any) => item.category === cat
      );
    } else {
      this.filteredItems = this.items;
    }
    this.pagesnum = Math.ceil(this.filteredItems.length / 12);
    this.pagearr = Array.from({ length: this.pagesnum }, (_, i) => i + 1);
    this.pagecontrol(1);
  }
  filterItemsBySearch() {
    let searchValue = this.search.value;
    if (searchValue) {
      this.filteredItems = this.items.filter((item: any) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      this.filteredItems = this.items;
    }
    this.pagesnum = Math.ceil(this.filteredItems.length / 12);
    this.pagearr = Array.from({ length: this.pagesnum }, (_, i) => i + 1);
    this.pagecontrol(1);
  }
  pagecontrol(pagenum: any = 'same') {
    if (pagenum === 'same') {
      let start = (this.pageindex - 1) * 12;
      let end = start + 12;
      this.pageitems = this.filteredItems.slice(start, end);
      if (this.pageitems.length < 1) {
        this.pagecontrol(1);
      }
    } else {
      let start = (pagenum - 1) * 12;
      let end = start + 12;
      this.pageitems = this.filteredItems.slice(start, end);
      this.pageindex = pagenum;
    }
  }
  deleteItem(e: any) {
    this.items = this.items.filter((item: any) => item.id !== e);
    var index = this.filteredItems.findIndex((item: any) => item.id == e);

    this.filteredItems.splice(index, 1);
    console.log('filter= ', this.filteredItems);
    this.pagesnum = Math.ceil(this.filteredItems.length / 12);
    this.pagearr = Array.from({ length: this.pagesnum }, (_, i) => i + 1);
    this.pagecontrol();
  }
}
