import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NodeActionDetails } from '../add-node/add-node.model';
import { NodeModel } from './node.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent {
  @Input()
  node!: NodeModel;

  @Output() nodeSelect = new EventEmitter();
  @Output() nodeAddOrDeleteAction = new EventEmitter<NodeActionDetails>();

  showAction:boolean = false;
  showAddFolderFromNode: boolean = false;
  nodeType: string = "unset";

  onSelect(value: string) {
    this.nodeSelect.emit(value);
  }

  addOrDeleteNode(nodedetails: NodeActionDetails): void {
    this.showAction = false;
    this.nodeAddOrDeleteAction.emit(nodedetails);
  }

  addNodeAction(event: NodeActionDetails): void {
    this.nodeType = 'unset';
    this.showAddFolderFromNode = false;
    this.addOrDeleteNode(event);
  }
}
