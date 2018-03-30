// eslint-disable-next-line no-unused-vars
import JasmineExpect from 'jasmine-expect'
import { toEqualMultiline, toThrowMultiline } from 'jasmine-multiline-matchers'

expect.extend({
  toEqualMultiline,
  toThrowMultiline,
})
