import { NgModule } from "@angular/core";
import {CommonModule} from '@angular/common';
import {NgForm, FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {DataViewModule} from 'primeng/dataview';
import {CardModule} from 'primeng/card';
import {GrowlModule} from 'primeng/growl';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {PaginatorModule} from 'primeng/paginator';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import {StepsModule} from 'primeng/steps';

@NgModule({
	declarations:[
	
		],
		providers:[],
	imports: [
			RouterModule,
			ReactiveFormsModule,
			CommonModule,
			ConfirmDialogModule,
			DataViewModule,
			DialogModule,
			TableModule,
			GrowlModule,
			FormsModule,
			PanelModule,
			CardModule,
			DropdownModule,
			ToastModule,
			StepsModule
        ],
        exports:[
			DataViewModule,
			DialogModule,
			TableModule,
			FormsModule,
			PanelModule,
            CardModule,
			GrowlModule,
			DropdownModule,
			ConfirmDialogModule,
			ReactiveFormsModule,
			ToastModule,
			StepsModule
        ]	
})

export class sharedPrimengModule{  }