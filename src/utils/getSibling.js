const getSibling = (cur, dir) => {
  // 根据方向获取下一个或上一个兄弟节点
  cur = cur[dir]
  // 如果存在兄弟节点且兄弟节点的节点类型不是元素节点，则继续向下一个兄弟节点移动
  while (cur && cur.nodeType !== 1) {
    cur = cur[dir]
  }
  // 返回找到的兄弟节点（或者是 null）
  return cur
}

export default getSibling
