// eslint-disable-next-line import/prefer-default-export
export const scope = value => {
  function scopedValues() {
    return value
  }
  return scopedValues
}
