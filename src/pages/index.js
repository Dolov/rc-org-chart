import React, { useState } from 'react'
import { Avatar, Icon, Menu, Dropdown, notification } from 'antd'
import OrgChart from '@/components'
import '@/components/style'
import data from './data'
import S from './index.less'


export default () => {

  const customDrag = (dropProps, dragProps) => {
    const { employees: dropHot } = dropProps
    const { employees: dragHot } = dragProps
    if (!dragHot) return true
    if (dragHot < dropHot) return true
    return false
  }

  return (
    <OrgChart 
      pan
      zoom
      draggable
      data={data} 
      maxZoom={2}
      minZoom={0.5}
      zoomStep={0.02}
      customDrag={customDrag}
      nodeRender={props => <NodeRender {...props}/>}
      extraRender={props => <ExtraRender {...props}/>}
    />
  )
}

const ExtraRender = props => {
  const { name } = props
  const [ isName, setName ] = useState(false)

  let render = <Icon type="question-circle" />
  if (isName) {
    render = <div>{name}</div>
  }
  return (
    <div onClick={() => setName(!isName)}>{render}</div>
  )
}


const NodeRender = props => {
  const { department, position, employees, avatar } = props
  const menuClick = () => {
    notification.info({
      message: 'Notification Title',
      description: '该功能正在开发中，敬请期待',
    })
  }
  const menu = (
    <Menu onClick={menuClick}>
      <Menu.Item> 编辑 </Menu.Item>
      <Menu.Item> 禁用 </Menu.Item>
      <Menu.Item> 删除 </Menu.Item>
      <Menu.Item> 添加下级组织 </Menu.Item>
    </Menu>
  )
  return (
    <div className={S.nodeRender}>
      <div className="top">
        <span className="department">{department}</span>
        <Avatar size={28} src={avatar} />
      </div>
      <div className="bottom">
        <div className="mess">
          <div>
            <span className="title">主管职位</span>
            <span className="position">{position}</span>
          </div>
          {employees&&(
            <div>
              <span className="title">下属人员</span>
              <span>{employees}</span>
            </div>
          )}
        </div>
        <div className="handleBar">
          <Dropdown overlay={menu} placement="bottomLeft">
            <span>...</span>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}