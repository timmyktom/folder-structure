import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NodeActionDetails } from './add-node.model';


@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss']
})
export class AddNodeComponent {
  @Input() type: string = "folder";
  @Input() parentId: string | undefined;
  @Input() showComponent: boolean = false;
  @Output() addNodeAction = new EventEmitter<NodeActionDetails>();

  name = new FormControl('');

  addNewNode(): void {
    this.addNodeAction.emit({
      action: 'add',
      type: this.type,
      name: this.name.value,
      parentId: this.parentId
    });
    this.clearForm();
  }

  cancelAddNode(): void {
    this.addNodeAction.emit({action: 'cancel', type: this.type});
    this.clearForm();
  }

  clearForm(): void {
    this.name.setValue('');
  }
}
