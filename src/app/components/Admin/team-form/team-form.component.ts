import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../../services/api.service';
import { TeamProfile, Social } from '../../../Models/ApiResponse';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
})
export class TeamFormComponent implements OnInit {
  teamForm: FormGroup;
  isEditMode = false;
  memberId: number | null = null;
  loading = false;
  socialPlatforms = [
    'Instagram',
    'Twitter',
    'LinkedIn',
    'Facebook',
    'YouTube',
    'TikTok',
    'X',
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      bio: ['', Validators.required],
      profile_image: [
        '',
        [Validators.required, Validators.pattern('https?://.+')],
      ],
      social_media_links: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.memberId = +id;
        this.loadTeamData();
      } else {
        this.addSocialLink();
      }
    });
  }

  private loadTeamData(): void {
    // First try to get data from route state
    const state = history.state;
    if (state?.memberData) {
      this.patchFormWithData(state.memberData);
    } else {
      // Fall back to API call if no state data
      this.loadTeamMember(this.memberId!);
    }
  }

  private patchFormWithData(member: TeamProfile): void {
    this.teamForm.patchValue({
      name: member.name,
      role: member.role,
      bio: member.bio,
      profile_image: member.profile_image,
    });

    // Clear existing social links
    while (this.socialLinks.length) {
      this.socialLinks.removeAt(0);
    }

    // Add social links from the member
    if (member.social_media_links?.length > 0) {
      member.social_media_links.forEach((link) => this.addSocialLink(link));
    } else {
      this.addSocialLink();
    }
  }

  get socialLinks(): FormArray {
    return this.teamForm.get('social_media_links') as FormArray;
  }

  addSocialLink(link: Social | null = null): void {
    const linkGroup = this.fb.group({
      platform: [link?.platform || '', Validators.required],
      url: [
        link?.url || '',
        [Validators.required, Validators.pattern('https?://.+')],
      ],
    });
    this.socialLinks.push(linkGroup);
  }

  removeSocialLink(index: number): void {
    this.socialLinks.removeAt(index);
  }

  loadTeamMember(id: number): void {
    this.loading = true;
    this.apiService.getTeamMember(id).subscribe({
      next: (member) => {
        this.patchFormWithData(member);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading team member:', error);
        this.loading = false;
        this.showSnackbar('Failed to load team member', 'error');
        this.router.navigate(['/admin/team']);
      },
    });
  }

  onSubmit(): void {
    if (this.teamForm.invalid) {
      this.teamForm.markAllAsTouched();
      this.showSnackbar('Please fill all required fields', 'error');
      return;
    }

    this.loading = true;
    const memberData = this.teamForm.value;

    if (this.isEditMode && this.memberId) {
      this.apiService.updateTeamMember(this.memberId, memberData).subscribe({
        next: () => {
          this.showSnackbar('Team member updated successfully', 'success');
          this.router.navigate(['/admin/team']);
        },
        error: (error) => {
          console.error('Error updating team member:', error);
          this.showSnackbar('Failed to update team member', 'error');
          this.loading = false;
        },
      });
    } else {
      this.apiService.createTeamMember(memberData).subscribe({
        next: () => {
          this.showSnackbar('Team member created successfully', 'success');
          this.router.navigate(['/admin/team']);
        },
        error: (error) => {
          console.error('Error creating team member:', error);
          this.showSnackbar('Failed to create team member', 'error');
          this.loading = false;
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/team']);
  }

  private showSnackbar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass:
        type === 'success' ? ['snackbar-success'] : ['snackbar-error'],
    });
  }
}
