import createQueryDescriptor from '../../objects/queryDescriptor'

const renderLtQuery = (breakpointMap, rangeItem, rangeItemValue) =>
  createQueryDescriptor({
    to: rangeItemValue,
  })

export default renderLtQuery
