export const QUERY_MIN_TEMPLATE = `@media (min-width: #{minWidth})`
export const QUERY_MAX_TEMPLATE = `@media (max-width: #{maxWidth})`
export const QUERY_MIN_MAX_TEMPLATE = `@media (min-width: #{minWidth}) and (max-width: #{maxWidth})`

export const QUERY_TEMPLATE = `#{query} {
#{value}
}`

export const DECLARATION_TEMPLATE = `#{name}: #{value};`

export const CSS_FUNCTION_TEMPLATE = `#{typeOfFunction}(#{value})`
