import createQueryDescriptor from '../../objects/queryDescriptor'

const renderGtQuery = (breakpointMap, rangeItem, rangeItemValue) =>
  createQueryDescriptor({ from: rangeItemValue })

export default renderGtQuery
