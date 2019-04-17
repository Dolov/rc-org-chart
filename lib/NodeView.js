import "antd/es/dropdown/style/css";
import _Dropdown from "antd/es/dropdown";
import "antd/es/avatar/style/css";
import _Avatar from "antd/es/avatar";
import "antd/es/menu/style/css";
import _Menu from "antd/es/menu";
import "antd/es/notification/style/css";
import _notification from "antd/es/notification";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import S from './NodeView.less';
export default class NodeView extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});
  }

  menuClick() {
    _notification.info({
      message: 'Notification Title',
      description: '该功能正在开发中，敬请期待'
    });
  }

  render() {
    const {
      department,
      position,
      employees,
      avatar
    } = this.props;
    const menu = React.createElement(_Menu, {
      onClick: this.menuClick
    }, React.createElement(_Menu.Item, null, " \u7F16\u8F91 "), React.createElement(_Menu.Item, null, " \u7981\u7528 "), React.createElement(_Menu.Item, null, " \u5220\u9664 "), React.createElement(_Menu.Item, null, " \u6DFB\u52A0\u4E0B\u7EA7\u7EC4\u7EC7 "));
    return React.createElement("div", {
      className: S.nodeView
    }, React.createElement("div", {
      className: "top"
    }, React.createElement("span", {
      className: "department"
    }, department), React.createElement(_Avatar, {
      size: 28,
      src: avatar
    })), React.createElement("div", {
      className: "bottom"
    }, React.createElement("div", {
      className: "mess"
    }, React.createElement("div", null, React.createElement("span", {
      className: "title"
    }, "\u4E3B\u7BA1\u804C\u4F4D"), React.createElement("span", {
      className: "position"
    }, position)), employees && React.createElement("div", null, React.createElement("span", {
      className: "title"
    }, "\u4E0B\u5C5E\u4EBA\u5458"), React.createElement("span", null, employees))), React.createElement("div", {
      className: "handleBar"
    }, React.createElement(_Dropdown, {
      overlay: menu,
      placement: "bottomLeft"
    }, React.createElement("span", null, "...")))));
  }

}