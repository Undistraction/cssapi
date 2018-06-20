import { head } from 'ramda'
import createRangedQueryDescriptor from '../breakpoints/descriptors/createRangedQueryDescriptor'
import createUnrangedQueryDescrptor from '../breakpoints/descriptors/createUnrangedQueryDescrptor'
import { propQuery } from '../objects/breakpointMapping'
import createQueryDescriptor from '../objects/queryDescriptor'
import { lengthEq1 } from '../utils/list'
import { applyOffsetToBreakpointValue } from '../utils/range'

// -----------------------------------------------------------------------------
// Query Header
// -----------------------------------------------------------------------------

// Use an array of mappings to decide which header to render
export const calculateQueryDescriptor = (idx, mappedValues) => {
  const queryValue = propQuery(mappedValues[idx])
  let nextQueryValue
  if (idx < mappedValues.length - 1) {
    nextQueryValue = propQuery(mappedValues[idx + 1])
  }
  return createQueryDescriptor({ from: queryValue, to: nextQueryValue })
}

export const calculateQueryDescriptorForRange = breakpointMap => range => {
  const firstRangeItem = head(range)
  const firstItemValue = applyOffsetToBreakpointValue(firstRangeItem)
  const renderQuery = lengthEq1(range)
    ? createUnrangedQueryDescrptor(firstRangeItem)
    : createRangedQueryDescriptor
  return renderQuery(breakpointMap, firstRangeItem, firstItemValue, range)
}
