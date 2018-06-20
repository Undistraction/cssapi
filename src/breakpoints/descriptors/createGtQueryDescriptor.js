import createQueryDescriptor from '../../objects/queryDescriptor'

const createGtQueryDescriptor = (breakpointMap, rangeItem, rangeItemValue) =>
  createQueryDescriptor({ from: rangeItemValue })

export default createGtQueryDescriptor
