export type ListItem = {
  avatar?: string
  title?: string
  desc?: string
  time?: string
  tag?: string
  tagType: '' | 'success' | 'danger' | 'info' | 'warning'
}

export type ListOptions = {
  title: string
  content: ListItem[]
}

export type ActionOptions = {
  text: string
  icon: string
}
