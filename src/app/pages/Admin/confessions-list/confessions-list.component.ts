import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AdminConfession } from '../../../Models/confession';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfessionCardComponent } from '../../../components/Admin/confession-card/confession-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../components/Admin/confirmation-dialog/confirmation-dialog.component';
import { finalize } from 'rxjs';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-confessions-list',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    ConfessionCardComponent,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatChip,
    MatTableModule,
  ],
  templateUrl: './confessions-list.component.html',
  styleUrl: './confessions-list.component.scss',
})
export class ConfessionsListComponent implements OnInit {
  confessions: AdminConfession[] = [];
  filteredConfessions: AdminConfession[] = [];
  isLoading = false;
  error: string | null = null;

  // Filter properties
  searchTerm = '';
  selectedCategory = '';
  selectedEmotion = '';
  approvalFilter: 'all' | 'approved' | 'pending' = 'all';

  // Pagination
  pageSize = 10;
  pageIndex = 0;
  totalConfessions = 0;

  // View mode
  viewMode: 'cards' | 'table' = 'cards';

  // For table view
  displayedColumns: string[] = [
    'id',
    'message',
    'category',
    'emotion',
    'is_approved',
    'created_at',
    'actions',
  ];
  dataSource = new MatTableDataSource<AdminConfession>();

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadConfessions();
  }

  loadConfessions(): void {
    this.isLoading = true;
    this.error = null;

    this.apiService
      .getConfessions()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response: any) => {
          this.confessions = response.data || response;
          this.applyFilters();
          this.dataSource.data = this.filteredConfessions;
          this.totalConfessions = this.filteredConfessions.length;
        },
        error: (err) => {
          this.error = 'Failed to load confessions. Please try again later.';
          console.error('Error loading confessions:', err);
        },
      });
  }

  applyFilters(): void {
    this.filteredConfessions = this.confessions.filter((confession) => {
      const matchesSearch = confession.message
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory
        ? confession.category === this.selectedCategory
        : true;
      const matchesEmotion = this.selectedEmotion
        ? confession.emotion === this.selectedEmotion
        : true;
      const matchesApproval =
        this.approvalFilter === 'all'
          ? true
          : this.approvalFilter === 'approved'
          ? confession.is_approved
          : !confession.is_approved;

      return (
        matchesSearch && matchesCategory && matchesEmotion && matchesApproval
      );
    });

    this.dataSource.data = this.filteredConfessions;
    this.totalConfessions = this.filteredConfessions.length;
    this.pageIndex = 0; // Reset to first page when filters change
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  onSortChange(sort: Sort): void {
    const data = this.filteredConfessions.slice();
    if (!sort.active || sort.direction === '') {
      this.filteredConfessions = data;
      return;
    }

    this.filteredConfessions = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'message':
          return compare(a.message, b.message, isAsc);
        case 'category':
          return compare(a.category, b.category, isAsc);
        case 'emotion':
          return compare(a.emotion, b.emotion, isAsc);
        case 'is_approved':
          return compare(a.is_approved, b.is_approved, isAsc);
        case 'created_at':
          return compare(new Date(a.created_at), new Date(b.created_at), isAsc);
        default:
          return 0;
      }
    });

    this.dataSource.data = this.filteredConfessions;
  }

  toggleApproval(confession: AdminConfession): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Status Change',
        message: `Are you sure you want to ${
          confession.is_approved ? 'reject' : 'approve'
        } this confession?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        const updatedConfession = {
          ...confession,
          is_approved: !confession.is_approved,
        };

        this.apiService
          .patchConfession(confession.id, updatedConfession)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe({
            next: () => {
              confession.is_approved = !confession.is_approved;
              this.applyFilters();
            },
            error: (err) => {
              this.error = 'Failed to update confession status.';
              console.error('Error updating confession:', err);
            },
          });
      }
    });
  }

  get uniqueCategories(): string[] {
    return [...new Set(this.confessions.map((c) => c.category))].sort();
  }

  get uniqueEmotions(): string[] {
    return [...new Set(this.confessions.map((c) => c.emotion))].sort();
  }

  get paginatedConfessions(): AdminConfession[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.filteredConfessions.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }
}

function compare(a: any, b: any, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
