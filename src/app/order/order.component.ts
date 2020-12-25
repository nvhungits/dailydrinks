import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ORDER } from '../order'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Array<ORDER>
  orderSelected: ORDER
  closeResult: string;
  isNew: boolean
  indexUpdate: number

  constructor(private modalService: NgbModal) {
    this.orders = new Array<ORDER>();
    this.orderSelected = new ORDER();
  }

  open(mymodal, index, message) {
    this.isNew = message == 'new';
    this.orderSelected = message == 'new' ? new ORDER() : this.orders[index];
    this.indexUpdate = index;
    this.modalService.open(mymodal);
  }
  delete(index) {
    this.orders.splice(index, 1);
    localStorage.setItem('dailydrinks', JSON.stringify(this.orders));
  }
  addOrUpdate(order){
    if(this.isNew){
      this.orders.unshift(order);
    }
    localStorage.setItem('dailydrinks', JSON.stringify(this.orders));
  }

  ngOnInit(): void {
    var dailydrinks = localStorage.getItem('dailydrinks');
    this.orders = dailydrinks ? JSON.parse(localStorage.getItem('dailydrinks')) : new Array<ORDER>();
  }
}
