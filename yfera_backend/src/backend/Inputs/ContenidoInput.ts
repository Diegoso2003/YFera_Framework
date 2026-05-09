import { Id } from './Id';
import { Label } from './Label';
import { Value } from './Value';

export class ContenidoInput {
  private id: Id;
  private label: Label;
  private value: Value;

  constructor(id: Id, label: Label, value: Value) {
    this.id = id;
    this.label = label;
    this.value = value;
  }

  public getId(): Id {
    return this.id;
  }
  public setId(value: Id) {
    this.id = value;
  }

  public getLabel(): Label {
    return this.label;
  }
  public setLabel(value: Label) {
    this.label = value;
  }

  public getValue(): Value {
    return this.value;
  }
  public setValue(value: Value) {
    this.value = value;
  }
}
