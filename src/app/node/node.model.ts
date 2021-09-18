export interface NodeModel {
    type: string;
    name?: string;
    children?: NodeModel[];
    id: string;
}