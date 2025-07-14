import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { TeamProfile } from '../../../Models/ApiResponse';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TruncatePipe } from '../../../Pipes/truncate.pipe';

@Component({
  selector: 'app-team-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    TruncatePipe,
  ],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss',
})
export class TeamListComponent implements OnInit {
  teamMembers: TeamProfile[] = [];
  loading = true;
  displayedColumns: string[] = ['image', 'name', 'role', 'bio', 'actions'];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTeamMembers();
  }

  loadTeamMembers(): void {
    this.loading = true;
    this.apiService.getAllTeam().subscribe({
      next: (response) => {
        this.teamMembers = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading team members:', error);
        this.loading = false;
        this.showSnackbar('Failed to load team members', 'error');
      },
    });
  }

  editMember(member: TeamProfile): void {
    this.router.navigate(['/admin/team', member.id, 'edit'], {
      state: { memberData: member }, // Pass the data via router state
    });
  }

  confirmDelete(member: TeamProfile): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${member.name}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMember(member.id!);
      }
    });
  }

  deleteMember(id: number): void {
    this.apiService.deleteTeamMember(id).subscribe({
      next: () => {
        this.showSnackbar('Team member deleted successfully', 'success');
        this.loadTeamMembers();
      },
      error: (error) => {
        console.error('Error deleting team member:', error);
        this.showSnackbar('Failed to delete team member', 'error');
      },
    });
  }

  addNewMember(): void {
    this.router.navigate(['/admin/team/new']);
  }

  private showSnackbar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass:
        type === 'success' ? ['snackbar-success'] : ['snackbar-error'],
    });
  }
}
