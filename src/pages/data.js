




export default [
  {
    id: '001',
    department: 'xixihaha',
    name: '天线宝宝',
    position: 'CEO',
    employees: 13,
    avatar: "http://img.52z.com/upload/news/image/20181123/20181123144652_33462.jpg",
    children: [
      {
        id: '002',
        department: '测试部',
        name: '葫芦娃',
        position: '测试主管',
        employees: 2,
        avatar: 'http://img.zcool.cn/community/015cb758e4c8fda801219c770b4bf4.png',
        children: [
          {
            id: '003',
            name: '海绵宝宝',
            avatar: 'http://s10.sinaimg.cn/middle/a3c11b85hcaaf6e8951f9&690',
            position: '测试',
            department: '测试部',
          },
          {
            id: '004',
            name: '派大星',
            avatar: 'http://n.sinaimg.cn/sinacn10107/530/w700h630/20190331/1743-huxwryw4256913.jpg',
            position: '测试',
            department: '测试部',
          },
        ]
      }, {
        id: '005',
        department: '研发部',
        name: '大熊',
        position: 'CTO',
        avatar: 'http://p0.qhimgs4.com/t01056685f97cc37a9f.jpg',
        employees: 6,
        children: [
          {
            id: '006',
            department: '前端研发组',
            name: '哆啦A梦',
            avatar: 'http://img4.imgtn.bdimg.com/it/u=1915294572,2691478166&fm=26&gp=0.jpg',
            position: '研发主管',
            employees: 2,
            children: [
              {
                id: '007',
                name: '佩奇',
                avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555600582&di=17ecb175de50dd9ad946d02ccd9b36ee&imgtype=jpg&er=1&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180830%2F77ecca0d75fe4b82b0cc76d2012c2cfd.jpeg',
                position: '开发',
                department: '前端研发组',
              },
              {
                id: '008',
                name: '德玛西亚之力盖伦',
                avatar: 'http://img.mp.itc.cn/upload/20160507/bc2167591044462f9d4f9cc2ce54299a_th.jpg',
                position: '开发',
                department: '前端研发组',
              },
            ]
          }, {
            id: '009',
            department: '后端研发组',
            name: '赛罗奥特曼',
            avatar: 'http://img3.duitang.com/uploads/item/201510/31/20151031235812_i3usj.thumb.700_0.jpeg',
            position: '研发主管',
            employees: 2,
            children: [
              {
                id: '010',
                name: '铁甲暴龙兽',
                avatar: 'http://i0.hdslb.com/bfs/article/404cbb71b5baab83dca06a59b8eb063fb18f8856.jpg',
                position: '开发',
                department: '后端研发组',
              },
              {
                id: '011',
                name: '车轮滚滚',
                position: '开发',
                avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3572739692,2115316078&fm=26&gp=0.jpg',
                department: '后端研发组',
              },
            ]
          }
        ],
      }, {
        id: '012',
        department: '高级顾问实施部',
        name: '孙悟饭',
        avatar: 'http://img1.imgtn.bdimg.com/it/u=670798554,27668845&fm=26&gp=0.jpg',
        position: '实施主管',
        employees: 2,
        children: [
          {
            id: '013',
            avatar: 'http://img2.imgtn.bdimg.com/it/u=170389182,436566452&fm=26&gp=0.jpg',
            name: '漩涡鸣人',
            department: '高级顾问实施部',
          },
          {
            id: '014',
            name: '弗拉基米尔',
            avatar: 'http://b-ssl.duitang.com/uploads/item/201703/20/20170320131919_4UQMP.jpeg',
            department: '高级顾问实施部',
          },
        ]
      },
    ]
  }
]
