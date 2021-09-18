import { Component, OnInit } from '@angular/core';
import { NodeActionDetails } from './add-node/add-node.model';
import { NodeModel } from './node/node.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  nodes: NodeModel[] = [];
  showAddFolderFromRoot: boolean = false;

  ngOnInit():void {
    this.nodes = [
      {
        type: 'folder',
        name: 'Employees',
        children: [
          {
            type: 'folder',
            name: 'Employees salary',
            children: [
              {
                type: 'file',
                name: 'Employee 1 payslip.pdf',
                children: [],
                id: '111'
              }
            ],
            id: '11'
          },
          {
            type: 'file',
            name: 'Employee 1 Photo.png',
            children: [],
            id: '12'
          }
        ],
        id: '1'
      },
      {
        type: 'folder',
        name: 'Customers',
        children: [],
        id: '2'
      }
    ]
  }

  showAddNode(): void {
    this.showAddFolderFromRoot = true;
  }

  nodeAction(event: NodeActionDetails): void {
    // console.log(event);
    switch (event.action) {
      case 'cancel':
        this.showAddFolderFromRoot = false;
        break;
      case 'add':
        if(event.name !== ''){
          this.addNewNode(event);
        }
        this.showAddFolderFromRoot = false;
        break;
      case 'delete':
        if(event.id){
          this.nodes = this.deleteNode(event.id, this.nodes)
        }
        break;
      default:
        break;
    }

    // console.log(this.nodes);
  }

  addNewNode(nodeDetails: NodeActionDetails): void {
    const nodeToAdd = {
      type: nodeDetails.type,
      name: nodeDetails.name,
      children: [],
      id: this.generateNewId()
    };
    if(!nodeDetails.parentId){
      this.nodes.push(nodeToAdd);
    } else {
      this.addNewNodeToParent(nodeDetails.parentId, this.nodes, nodeToAdd);
    }
  }

  deleteNode(nodeId: string, nodesAry: NodeModel[]): NodeModel[] {
    return nodesAry.filter((filterNode) => {
      const shouldDelete = filterNode.id === nodeId;
      if (!shouldDelete && filterNode.type === 'folder' && filterNode.children) {
        filterNode.children = this.deleteNode(nodeId, filterNode.children);
      }
      return !shouldDelete;
    });
  }

  addNewNodeToParent(parentNodeId: string, nodesAry: NodeModel[], nodeDetails: NodeModel): void {
    nodesAry.forEach(nodeItem => {
      if(nodeItem.id === parentNodeId && nodeItem.children){
        nodeItem.children.push(nodeDetails);
      } else if(nodeItem.type === 'folder' && nodeItem.children){
        this.addNewNodeToParent(parentNodeId, nodeItem.children, nodeDetails);
      }
    });
  }

  private generateNewId(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}
