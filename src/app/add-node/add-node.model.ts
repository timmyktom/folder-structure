export interface NodeActionDetails {
    action: 'add' | 'cancel' | 'delete';
    type: string;
    name?: string;
    parentId?: string;
    id?: string;
}