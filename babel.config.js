module.exports = api => {
  api.cache(true)
  
  return {
    plugins: [
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-syntax-dynamic-import',
      "@babel/plugin-proposal-class-properties"
    ]
  }
}