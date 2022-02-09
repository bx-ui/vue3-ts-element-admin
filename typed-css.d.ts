declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module 'path' {
  const classes: any
  export default classes
}

declare module 'css-color-function' {
  const classes: any
  export default classes
}

declare module '*.json' {
  const value: any;
  export default value;
}
