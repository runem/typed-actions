/*
 * Helpers used for treating "undefined" generic parameters as optional.
 * See Typescript issue https://github.com/Microsoft/TypeScript/issues/12400 for more information.
 * Until this issue has been closed it's possible to simulate optional generic parameters using tuple types and spread expressions.
 *
 * Example:
 *   createAction<Payload, Meta>(...payloadAndMeta: OptionalSpreadTuple<Payload, Meta>)
 *
 *   createAction<undefined, undefined>();
 *   createAction<string, undefined>("hello");
 *   createAction<string, string>("hello", "world");
 */

/**
 * Optional spread two generic parameters.
 * <undefined, undefined>   =>  [T?, U?]
 * <defined, undefined>     =>  [T, U?]
 * <undefined, defined>     =>  [T, U]
 * <defined, defined>       =>  [T, U]
 */
export type OptionalSpreadTuple<T, U> = IfVoid<U, IfVoid<T, [T?, U?], [T, U?]>, [T, U]>

/**
 * Optional spread two generic parameters always forcing the last one to be optional.
 * <undefined, undefined>   =>  [T?, U?]
 * <defined, undefined>     =>  [T, U?]
 * <undefined, defined>     =>  [T, U?]
 * <defined, defined>       =>  [T, U?]
 */
export type OptionalSpreadTupleAlwaysOptional<T, U> = IfVoid<T, [T?, U?], [T, U?]>


/**
 * Choose the first type if T is "void".
 * Choose the second type if T is not "void".
 * Checks for undefined and null because "void" matches both.
 */
export type IfVoid<T, VoidType, ElseType> = T extends undefined ? ElseType : (T extends null ? ElseType : (T extends void ? VoidType : ElseType))