// takes a list of arguments shaped as objects: {<ItemToAdd>, type: <"Type">}
module.exports = (...props) => {
  return props.reduce((memo, prop) => {
    const key = Object.keys(prop)[0]
    if (prop[key]) {
      memo[key] = { [prop.type]: prop[key] }
    }
    return memo
  }, {})
}
