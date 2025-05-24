import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../app.component'; // Import Customer interface from app.component
import { CommonModule } from '@angular/common'; // Needed for directives like *ngFor, *ngIf
@Component({
  selector: 'customer-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css'] // Assuming .css here. Adjust to .scss if needed.
})
export class CustomerTableComponent {
  @Input() customers: Customer[] = [];
  @Output() setSelectedId = new EventEmitter<string>();

  onViewDetails(customerId: string): void {
    this.setSelectedId.emit(customerId);
  }
}