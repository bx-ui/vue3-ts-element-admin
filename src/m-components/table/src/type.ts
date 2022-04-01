export interface TableOptions {
  type?: string
  index?: number
  label: string
  columnKey?: string
  prop?: string
  width?: string | number
  minWidth?: string | number
  fixed?: boolean | 'left' | 'right'
  renderHeader?: any
  sortable?: boolean | 'custom'
  sortOrders?: any[]
  resizable?: boolean
  showOverflowTooltip?: boolean
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  className?: string
  labelClassName?: string
  reserveSelection?: boolean
  filterPlacement?: string
  filterMultiple?: boolean
  filteredValue?: any[]
  // 标记是否为操作列
  action?: boolean
  // 标记插槽的名称
  slot?: string
  // 标记当前是否可编辑
  editable?: boolean
}
