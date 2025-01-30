import { AbstractNode, NodeType } from './abstract';
import { BinaryExpressionNode } from './binary-expression';
import { ValueNode } from './value.ts';

export class RootNode extends AbstractNode {
    public readonly type = NodeType.Root;

    constructor(
        public expression: BinaryExpressionNode | ValueNode | null,
        public source: string,
    ) {
        super();
    }
}
