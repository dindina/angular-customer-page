import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
// Import both Customer and CustomerDetail interfaces from app.component
import { Customer, CustomerDetail } from '../app.component';
import { CommonModule } from '@angular/common';

// Define the combined interface for the displayed data in CustomerDetailsComponent
// This interface combines fields from both Customer and CustomerDetail
export interface CombinedCustomer {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  gender: string;
  pin: number;
  country: string;
  state: string;
}

@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./customer-details.component.css'] // Assuming .css here. Adjust to .scss if needed.
})
export class CustomerDetailsComponent implements OnChanges {
  @Input() customerDetailsRecords: CustomerDetail[] = [];
  @Input() selectedId: string | null = null;
  @Input() customersBasicInfo: Customer[] = []; // New input to get basic customer data

  displayedCustomerDetail: CombinedCustomer | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedId'] || changes['customerDetailsRecords'] || changes['customersBasicInfo']) {
      this.updateDisplayedCustomerDetail();
    }
  }

  private updateDisplayedCustomerDetail(): void {
    if (this.selectedId && this.customerDetailsRecords.length > 0 && this.customersBasicInfo.length > 0) {
      const basicInfo = this.customersBasicInfo.find(
        customer => customer.id === this.selectedId
      );
      const detailedInfo = this.customerDetailsRecords.find(
        detail => detail.id === this.selectedId
      );

      // If both parts (basic and detailed) are found, create the combined object
      if (basicInfo && detailedInfo) {
        this.displayedCustomerDetail = {
          id: basicInfo.id, // IDs should match, can use either
          firstName: basicInfo.firstName,
          lastName: basicInfo.lastName,
          age: basicInfo.age,
          city: detailedInfo.city,
          gender: detailedInfo.gender,
          pin: detailedInfo.pin,
          country: detailedInfo.country,
          state: detailedInfo.state,
        };
      } else {
        this.displayedCustomerDetail = null; // If one or both parts are not found, clear display
      }
    } else {
      this.displayedCustomerDetail = null; // If no ID selected or data is missing, clear display
    }
  }
}