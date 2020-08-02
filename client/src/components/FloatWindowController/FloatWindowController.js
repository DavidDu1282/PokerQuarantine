import React from "react";
import { FloatWindow } from '..';

class FloatWindowController extends React.Component {
  /**
   * Float window container providing window with drag & move capability
   * ------------------ 
   * props:
   *    windows: {'label': { content, display, width, height, ...FloatWindowSettings }
   */

  constructor(props) {
    super(props);

    // set default options
    let window_options = {};

    for (const [label, options] of Object.entries(props.windows)) {
      window_options[label] = { x: 0, y: 0, z: 0, display: false };
    }

    this.state = {
      focus: '',
      focus_z: 0,
      window_options: window_options
    }
    this.dragging = '';
  }

  init(center, starting_window) {
    // relocate all windows to center and only show the starting_window
    let window_options = {};
    for (const [label, options] of Object.entries(this.props.windows)) {
      window_options[label] = { x: center.x - options.width/2, y: center.y - options.height/2, z: 0, display: false };
    }

    this.setState((state) => { return {
      focus_z: 0,
      window_options: window_options
    }});

    this.show(starting_window);
  }

  /* Hide and show windows */

  move(name, pos) {
    let new_options = Object.assign({}, this.state.window_options);
    new_options[name].x = pos.x;
    new_options[name].y = pos.y;

    this.setState((state) => { return {
      window_options: new_options
    }});
  }

  hide(name) {
    this.set_options(name, {display: false});
  }
  
  show(name) {
    this.set_options(name, {display: true});
    this.focus(name);
  }

  focus(name) {
    if (this.state.focus === name) return;
    this.set_options(name, {z: this.state.focus_z+1});
  }

  set_options(name, option) {
    let window = this.state.window_options[name];
    if (window == null) throw new Error('Panel with name do not exist');

    let new_options = Object.assign({}, this.state.window_options);
    new_options[name].z = option.z ? option.z : window.z;
    if (option.display != null) {
      new_options[name].display = option.display;
    } else {
      new_options[name].display = window.display;
    }
    
    this.setState((state) => { return {
      focus: name,
      focus_z: option.z ? option.z : state.focus_z,
      window_options: new_options
    }});
  }

  /* Drag */

  drag(e) {
    // move the container
    if (this.dragging === '') return;

    const window = this.state.window_options[this.dragging];
    let pos = {
      x: e.clientX - this.mouse_offset.x,
      y: e.clientY - this.mouse_offset.y
    };

    this.move(this.dragging, pos);
  }

  dragInitiate(e, name) {
    const window = this.state.window_options[name];
    this.mouse_offset = {x: e.clientX - window.x, y: e.clientY - window.y};
    this.dragging = name;
  }

  dragEnd(e) {
    this.dragging = '';
  }

  render() {
    const windows = []

    for (const [label, options] of Object.entries(this.props.windows)) {
      const { content, display, ...others } = options;
      const { ...display_options } = this.state.window_options[label];

      windows.push(
        <FloatWindow
          name={label}
          key={label}
          onMouseDown={e => this.dragInitiate(e, label)}
          onMouseUp={e => this.dragEnd(e)}
          onClick={() => this.focus(label)}
          elevation={label === this.state.focus ? 7 : 1}
          controller={this}
          {...display_options}
          {...others}
        >{content}</FloatWindow>);
    }
    
    return (
      <div onMouseMove={e => this.drag(e)}>
        {windows}
      </div>
    );
  }

}

export default FloatWindowController;