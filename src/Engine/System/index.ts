export type SystemProps = {
  [key: string]: any;
};

class System {
  private systemState: any;
  public readonly debounceIntervalInMiliseconds?: number;
  public readonly name: string;
  public readonly props: any;
  constructor(
    key: string,
    props?: SystemProps,
    debounceIntervalInMiliseconds?: number
  ) {
    this.debounceIntervalInMiliseconds = debounceIntervalInMiliseconds;
    this.name = name;
    this.props = props || {};
  }

  get state() {
    return this.systemState;
  }
  set state(newState: any) {
    this.systemState = newState;
  }

  onAdded() {}

  onRemove() {}

  onUpdate(delta: number) {}
}

export default System;
