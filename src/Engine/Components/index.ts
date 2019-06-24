import uuidv4 from "uuid/v4";

export class Component {
  uuid: string;
  type: string;
  data: any;
  constructor(type: string, props: any) {
    this.data = props;
    this.type = type;
    this.uuid = uuidv4();
    components.add(this);
  }

  private expandStuff(obj: any) {
    return Object.keys(obj).reduce((prev, current) => {
      const currentValue = obj[current];
      if (currentValue["@id"] && currentValue["@type"]) {
        const component = components.getById(
          currentValue["@type"],
          currentValue["@id"]
        );
        prev[current] = component && component.expand();
        return prev;
      }
      prev[current] = obj[current];
      return prev;
    }, {});
  }

  // Resolve the graph.
  expand() {
    return {
      uuid: this.uuid,
      type: this.type,
      data: this.expandStuff(this.data)
    };
  }
}

interface ComponentIndex {
  [componentType: string]: {
    [componentUUID: string]: Component;
  };
}

interface Follow {
  onAdd?: (component: Component) => void;
  onUpdate?: (component: Component) => void;
  onDelete?: (component: Component) => void;
}

interface FollowList {
  [componentType: string]: Follow[];
}

class Components {
  index: ComponentIndex;
  followList: FollowList = {};
  constructor(index?: ComponentIndex) {
    this.index = index || {};
  }

  getById(type: string, id: string) {
    return this.index[type] && this.index[type][id];
  }

  add(component: Component) {
    this.index[component.type] = {
      ...this.index[component.type],
      [component.uuid]: component
    };
    if (this.followList[component.type]) {
      this.followList[component.type].forEach(follow => {
        follow.onAdd && follow.onAdd(component);
      });
    }
  }

  update(component: Component) {
    this.index[component.type] = {
      ...this.index[component.type],
      [component.uuid]: component
    };
    if (this.followList[component.type]) {
      this.followList[component.type].forEach(follow => {
        follow.onUpdate && follow.onUpdate(component);
      });
    }
  }

  remove(component: Component) {
    const { [component.uuid]: key, ...filteredComponents } = this.index[
      component.type
    ];
    this.index[component.type] = filteredComponents;
    if (this.followList[component.type]) {
      this.followList[component.type].forEach(follow => {
        follow.onDelete && follow.onDelete(component);
      });
    }
  }

  follow(componentTypes: string[], follow: Follow) {
    componentTypes.forEach(type => {
      if (this.followList[type]) {
        this.followList[type].push(follow);
      }
      this.followList[type] = [follow];
    });
  }
}

// TODO load component index from somewhere
const components = new Components();

export default components;
