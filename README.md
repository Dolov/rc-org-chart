<p align="center">
  <a href="http://example.shisongyan.top/rc-org-chart/">
    <img src="https://user-gold-cdn.xitu.io/2019/4/12/16a10d8dc669701e?w=2544&h=1206&f=png&s=546061">
  </a>
</p>

<h1 align="center">rc-org-chart</h1>


<div align="center">
基于 React 的组织结构组件
</div>

## ✨ 特性
- 使用简单，可扩展性强。
- 可拖动调整位置。
- 可自定义位置变动规则。
- 可自定义节点视图。



## 📦 安装
```bash
npm install rc-org-chart --save
```

```bash
yarn add rc-org-chart
```

## 🔨 示例
```jsx
import OrgChart from 'rc-org-chart';

ReactDOM.render(<OrgChart />, mountNode);
```

引入样式：

```jsx
import 'rc-org-chart/lib/style';  
```
## 🍭 API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 组织结构数据 (必填项且每条数据必须有唯一 id) | array | [ ] |
| pan | 图层是否允许拖动 | boolean | true |
| zoom | 图层是否允许缩放 | boolean | true |
| draggable | 节点是否允许拖拽 | boolean | true |
| maxZoom | 图层最大放大比例 | number | 2 |
| minZoom | 图层最大缩小比例 | number | 0.5 |
| zoomStep | 缩放幅度 | number | 2 |
| customDrag | 用户可根据具体的数据字段及业务场景制定节点拖拽规则，返回 true 则允许 drag 节点 添加到 drop 节点 | (dropProps, dragProps) => true | true |
| nodeRender | 用户自定义节点的渲染 | props => <div style="background:#999">{props.name}</div> |  |
| extraRender | 位于节点下部的自定义渲染 | props => <div style="background:#999">{props.name}</div> |  |



## ⌨️ 本地开发
```bash
$ git clone git@github.com:Dolov/rc-org-chart.git
$ cd rc-org-chart
$ npm install
$ npm start
```

打开浏览器访问 http://127.0.0.1:8000