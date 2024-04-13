import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-estate',
  templateUrl: './add-estate.component.html',
  styleUrl: './add-estate.component.scss',
})
export class AddEstateComponent implements OnInit {
  form: UntypedFormGroup;

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.form = new UntypedFormGroup({
      grad: new UntypedFormControl(''),
      kvadratura: new UntypedFormControl(''),
      cijena: new UntypedFormControl(null),
      opis: new UntypedFormControl(''),
    });
  }
}
