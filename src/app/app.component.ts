import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './_helpers/must-match.validator';
// import custom validator to validate that password and confirm password fields match
import { PasswordStrengthValidator } from './_helpers/password-strength.validators';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular ' + VERSION.major;
  createPasswordForm: FormGroup;
constructor(
        private _formBuilder: FormBuilder,) {}
  ngOnInit(){
     this.createPasswordForm = this._formBuilder.group({
            password: [null, Validators.compose([Validators.required,
                // 2. check whether the entered password has a number
                PasswordStrengthValidator.patternValidator(/\d/, { hasNumber: true }),  // 3. check whether the entered password has upper case letter
                PasswordStrengthValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                // 4. check whether the entered password has a lower-case letter
                PasswordStrengthValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
                // 5. check whether the entered password has a special character
                PasswordStrengthValidator.patternValidator(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, { hasSpecialCharacter: true }),
                // 6. Has a minimum length of 8 characters
                Validators.minLength(8)
    
                ])],


            confirmPassword: ['', [Validators.required]]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });

         this.showValidationSuggestions();
  }

  showValidationSuggestions(){
        this.createPasswordForm.controls['password'].valueChanges
        .subscribe(() => {
          this.createPasswordForm.controls['password'].markAsTouched();
        });
    }

      get createPasswordFormValidation() {
        return this.createPasswordForm.controls;
    }
}
