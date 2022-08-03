import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BalanceUI } from '../models/balanceUI';
import { getInventory } from './inventory.actions';
import { InventoryService } from './inventory.service';
import { InventoryState } from './reducers';
import { first, tap } from 'rxjs/operators';
import { noop, Observable } from 'rxjs';
import { AppState } from '../app.state';
import { LocationQuantity } from '../models/locationQuantity';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { InventioryDataService } from './inventiory-data.service';
import {
  getProductByName,
  selectProductByName,
  selectProductByNameAndLocation,
} from './inventory.selectors';
import { ProductNamePipe } from '../pipes/product-name.pipe';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { data } from '../models/balance';
declare var window: any;
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  product: BalanceUI | undefined;
  productName: string = '';
  filteredProducts: BalanceUI[] = [];
  dataSource!: any;
  tableData: data[] = [];

  display = 'none';
  @ViewChild('error_message') error_message!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private inventoryDataService: InventioryDataService,
    private inventoryService: InventoryService,
    private dialog: MatDialog // private productPipe: ProductNamePipe
  ) {}
  displayedColumns: string[] = [
    'id',
    'productName',
    'departmentName',
    'quantity',
  ];

  ngOnInit(): void {
    this.inventoryDataService.entities$.subscribe({
      next: (inventory) => {
        setTimeout(() => {
          for (let invent of inventory) {
            console.log(invent);
            let table!: data;
            console.log(invent.product.id);
            table = {
              id: invent.product.id,
              productName: invent.product.name,
              departmentName: invent.product.department.name,
              quantity: invent.quantity,
            };
            this.tableData.push(table);
          }
          console.log(this.tableData);
          this.dataSource = new MatTableDataSource(this.tableData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 0);
      },
    });
  }

  openProductModal(balance: BalanceUI) {
    this.dialog.open(ProductModalComponent, {
      data: balance,
    });
  }
  Filterchange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
