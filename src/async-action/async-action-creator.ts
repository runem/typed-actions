import { ActionIdType, ActionStatusKind, DefaultActionMetaType, DefaultActionPayloadType } from "../action/action";
import { ActionCreator, actionCreator, ActionCreatorWithMeta } from "../action/action-creator";

type P = DefaultActionPayloadType;
type M = DefaultActionMetaType;

/**
 * The base of async actions creators.
 * An async action creator comes with an "id" field used for type guarding.
 */
export interface AsyncActionCreatorBase<Start, Success, Failure, Meta> {
	id: ActionIdType;
}

/**
 * Defines an async action creator that provides "start", "success" and "failure" action creator functions.
 * If this action creator is used as a function it will return an action creator with predefined metadata.
 */
export interface AsyncActionCreator<Start = P, Success = P, Failure = P, Meta = M> extends AsyncActionCreatorBase<Start, Success, Failure, Meta> {
	start: ActionCreator<Start, Meta>;
	success: ActionCreator<Success, Meta>;
	failure: ActionCreator<Failure, Meta>;
	(defaultMeta: Meta): AsyncActionCreatorWithMeta<Start, Success, Failure, Meta>;
}

/**
 * An async action creator with predefined metadata.
 */
export interface AsyncActionCreatorWithMeta<Start = P, Success = P, Failure = P, Meta = M> extends AsyncActionCreatorBase<Start, Success, Failure, Meta> {
	meta: Meta;
	start: ActionCreatorWithMeta<Start, Meta>;
	success: ActionCreatorWithMeta<Success, Meta>;
	failure: ActionCreatorWithMeta<Failure, Meta>;
}

/**
 * Makes an async action creator with "start", "success" and "failure" action creator functions.
 * Use it as a function to add predefined metadata to the action creator.
 * @param id
 */
export function asyncActionCreator<Start = P, Success = P, Failure = P, Meta = M> (id: ActionIdType): Meta extends void ? AsyncActionCreatorWithMeta<Start, Success, Failure, Meta> : AsyncActionCreator<Start, Success, Failure, Meta>;
export function asyncActionCreator<Start = P, Success = P, Failure = P, Meta = M> (id: ActionIdType, defaultMeta: Meta): AsyncActionCreatorWithMeta<Start, Success, Failure, Meta>;
export function asyncActionCreator<Start = P, Success = P, Failure = P, Meta = M> (id: ActionIdType, defaultMeta?: Meta): AsyncActionCreator<Start, Success, Failure, Meta> | AsyncActionCreatorWithMeta<Start, Success, Failure, Meta> {

	if (defaultMeta == null) {
		// If no metadata is specified we want to create an async action creator without metadata.

		// The base must be a function that takes metadata returns action creator with built in metadata.
		const func = (meta: Meta) => asyncActionCreator<Start, Success, Failure, Meta>(id, meta);

		// Assign corresponding action creators to the function
		return Object.assign(func, {
			id,
			start: actionCreator<Start, Meta>(id, ActionStatusKind.START),
			success: actionCreator<Success, Meta>(id, ActionStatusKind.SUCCESS),
			failure: actionCreator<Failure, Meta>(id, ActionStatusKind.FAILURE)
		}) as AsyncActionCreator<Start, Success, Failure, Meta> | AsyncActionCreatorWithMeta<Start, Success, Failure, Meta>;

	} else {
		// If metadata is specified we want to create corresponding sub action creators with the default metadata.
		return {
			id,
			meta: defaultMeta,
			start: actionCreator<Start, Meta>(id, ActionStatusKind.START, defaultMeta),
			success: actionCreator<Success, Meta>(id, ActionStatusKind.SUCCESS, defaultMeta),
			failure: actionCreator<Failure, Meta>(id, ActionStatusKind.FAILURE, defaultMeta)
		};
	}
}
