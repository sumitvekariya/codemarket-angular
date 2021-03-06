import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BreadCumb } from '../../shared/models/bredcumb.model';
import {FormBuilderService} from '../form-builder.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { catchError, } from 'rxjs/operators';
import { of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-add-form-data',
  templateUrl: './add-form-data.component.html',
  styleUrls: ['./add-form-data.component.scss']
})
export class AddFormDataComponent implements OnInit {

  formName = '';
  connectedFormStructureId = '';

  constructor(
    private formBuilderService: FormBuilderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private _platformId) {
    this.formName = this.activatedRoute.snapshot.params['formname'];
    this.connectedFormStructureId = this.activatedRoute.snapshot.params['formId'];
  }
  formJsonListSubscription: Subscription;
  breadcumb: BreadCumb;
  public form1 = {components: []};
  formDetails: FormGroup;


  ngOnInit() {
    this.breadcumb = {
      title: 'Fill Form Data',
    };

    this.formJsonListSubscription = this.formBuilderService.fetchFormStructureById(this.connectedFormStructureId).subscribe((form) => {
      if (form) {
        this.form1 = form.formStructureJSON;
      }
      this.formDetailsInitialization(null);
    });
  }

  onSubmitForm1(event) {
    console.log(event.data);
    this.formDetails.value.formDataJson = event.data;

    this.formBuilderService.addformData(this.formDetails.value).pipe(
      catchError((e) => {
        console.log(e);
        return of(false);
      })
    ).subscribe((d: any) => {
      if (d) {
        Swal.fire(`${d.formname} has been Added Successfully`, '', 'success').then(() => {
          this.router.navigate(['/', 'form-builder']);
        });
      }
    });
  }

  formDetailsInitialization(i: any) {
    this.formDetails = new FormGroup({
      formname: new FormControl(i && i.formname ? i.formname : this.formName, Validators.required),
      formDataJson: new FormControl(i && i.jsonstring ? i.jsonstring : '', Validators.required),
      connectedFormStructureId: new FormControl(i && i._id ? i._id : this.connectedFormStructureId)
    });
  }

  isBrowser() {
    return isPlatformBrowser(this._platformId);
  }

}
