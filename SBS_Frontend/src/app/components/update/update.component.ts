import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service'; // Update with the correct path
import { ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService } from '../../services/jwt-helper.service'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserRoles } from '../../user-roles';
@Component({
  selector: 'app-update-component',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  updateForm!: FormGroup;
  userData: any;
  id: any;
  updatedData: any;
  token = localStorage.getItem('jwtToken')|| '{}';
  decodedToken = this.jwtHelper.decodeToken(this.token);

  constructor(private formBuilder: FormBuilder, private userService: UserService,private router: Router, private jwtHelper: JwtHelperService) {}

  ngOnInit() {
    if (this.jwtHelper.checkSessionValidity(UserRoles.customer)){
    this.userData = history.state.userData;
    this.initForm();
  }
  }

  initForm() {
    this.updateForm = this.formBuilder.group({
      firstName: [this.userData.firstName, Validators.required],
      lastName: [this.userData.lastName, Validators.required],
      email: [this.userData.emailAddress, [Validators.required, Validators.email]],
      address: [this.userData.address],
      phoneNumber: [this.userData.phoneNumber]
      
      // Add more form controls as needed
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      
      
       this.updatedData = {
        userId: this.userData.userId,
        firstName: this.updateForm.value.firstName,
        lastName: this.updateForm.value.lastName,
        emailAddress: this.updateForm.value.email,
        address: this.updateForm.value.address,
        phoneNumber: this.updateForm.value.phoneNumber,
        role:{
          roleId: this.decodedToken?.role
        }
        // Add more fields as needed
      };
      console.log(this.decodedToken);
      const userDetails: any = {
        user:{
          userId: this.decodedToken?.userId 
        },
        updateData: JSON.stringify(this.updatedData)

      };
      console.log(userDetails)
    
      this.userService.updateUserData(userDetails).subscribe(
        () => {
          console.log('User data updated successfully');
          this.router.navigate(['/profile']);
          // Optionally, you can navigate to another page or show a success message
        },
        (error) => {
          console.error('Failed to update user data:', error);
          alert('Failed to update user data. Please try again.');
          // Optionally, you can handle the error in other ways, such as showing a different alert message or staying on the same page
        }
      );
      
    }
  }
}
