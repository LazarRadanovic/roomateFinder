import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { EventModel } from '../../../models/EventModel';
import { environment } from '../../../../environments/environment';
import { EventService } from '../../../services/event-service.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss',
})
export class AddEventComponent {
  form: UntypedFormGroup;
  default_img: string =
    'https://www.ucg.ac.me/tumber.php?src=skladiste/blog_1295/objava_178074/političke_nauke-11-22-18.jpg&w=968';
  @Output() toggleToastr = new EventEmitter<boolean>();
  sharedVariable: boolean;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new UntypedFormGroup({
      naslov: new UntypedFormControl(''),
      date: new UntypedFormControl(''),
      opis: new UntypedFormControl(null),
    });
  }

  addEvent() {
    const formEvent: EventModel = {
      tittle_event: this.form.get('naslov').value,
      timeOf_event: this.form.get('date').value,
      desc_event: this.form.get('opis').value,
      img: this.default_img,
    };

    this.eventService.addEvent(formEvent).subscribe((data: boolean) => {
      if (data) {
        this.toggleEvent(data);
      }
    });
  }

  toggleEvent(value: boolean) {
    this.toggleToastr.emit(value);
  }
}
