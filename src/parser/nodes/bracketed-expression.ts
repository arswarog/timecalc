import { Token } from '../lexer';

import { AbstractNode, NodeType } from './abstract';
import { Value } from './value.type';

export class BracketedExpressionNode extends AbstractNode {
    public readonly type = NodeType.BracketedExpression;

    constructor(
        public expression: AbstractNode,
        public openingBracket: Token,
        public closingBracket: Token,
    ) {
        super();

        this.start = openingBracket.start;
        this.end = closingBracket.end;
    }

    public evaluate(): Value {
        return this.expression.evaluate();
    }
}
