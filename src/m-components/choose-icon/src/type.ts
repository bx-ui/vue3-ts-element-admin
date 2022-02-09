export type ElementDialogAttrs = {
  width?: string | number
  fullscreen?: boolean
  top?: string
  modal?: boolean
  appendToBody?: boolean
  lockScroll?: boolean
  customClass?: string
  openDelay?: number
  closeDelay?: number
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  beforeClose?: any
  center?: boolean
  destroyOnClose?: boolean
}

export type ElementButtonAttrs = {
  size?: 'large' | 'default' | 'small'
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  plain?: boolean
  round?: boolean
  circle?: boolean
  loadingIcon?: boolean
  disabled?: boolean
  icon?: string
  autofocus?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  autoInsertSpace?: boolean
}
