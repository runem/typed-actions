import { ActionIdType, DefaultActionMetaType, DefaultActionPayloadType } from "../action/action";
import { AsyncActionCreator, asyncActionCreator, AsyncActionCreatorWithMeta } from "../async-action/async-action-creator";
import { IfVoid } from "../helper";

/**
 * Default action creator with built in metadata where only the Success and Meta types are user defined.
 * Started Type: void
 * Success Type: user defined
 * Failure Type: Error
 */
export type DefaultAsyncActionCreatorWithMeta<Success = DefaultActionPayloadType, Meta = DefaultActionMetaType> = AsyncActionCreatorWithMeta<void, Success, Error, Meta>;

/**
 * Default action creator where only the Success and Meta types are user defined.
 * Started Type: void
 * Success Type: user defined
 * Failure Type: Error
 */
export type DefaultAsyncActionCreator<Success = DefaultActionPayloadType, Meta = DefaultActionMetaType> = AsyncActionCreator<void, Success, Error, Meta>;

/**
 * Used to keep track of how many action creators have been created in order to auto generate ids.
 */
let n = 0;

/**
 * Creates a default async action creator where only the Success and Meta types are user defined.
 * If no id is given and id is auto-generated:                   `ACTION_${n}`.
 * If both "idOrNamespace" and "id" is given, the id will be    `${namespace}/${id}`.
 * @param idOrNamespace
 * @param id
 */
export function defaultAsyncActionCreator<Success = DefaultActionPayloadType, Meta = DefaultActionMetaType> (idOrNamespace?: ActionIdType, id?: ActionIdType): IfVoid<Meta, DefaultAsyncActionCreatorWithMeta<Success, Meta>, DefaultAsyncActionCreator<Success, Meta>> {

	if (idOrNamespace == null) {
		// Auto generate an id if needed
		idOrNamespace = `ACTION_${n++}`;

	} else if (id != null) {
		// Concatenate namespace and id
		idOrNamespace = `${idOrNamespace}/${id}`;
	}

	return asyncActionCreator<void, Success, Error, Meta>(idOrNamespace);
}
