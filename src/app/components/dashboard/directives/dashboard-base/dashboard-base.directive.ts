import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../../../services/http.service';

@Directive()
export abstract class DashboardBaseDirective<DT = any> {
  @Input() label!: string;
  @Input() size: string = '4';
  @Output() onDelete: EventEmitter<string> = new EventEmitter();

  data?: DT;
  
  constructor(
    public httpService: HttpService,
  ) { }

}
