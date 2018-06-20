import createQueryDescriptor from '../../objects/queryDescriptor'

const createLtQueryDescriptor = (breakpointMap, rangeItem, rangeItemValue) =>
  createQueryDescriptor({
    to: rangeItemValue,
  })

export default createLtQueryDescriptor
