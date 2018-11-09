import { Action, ActionStatusKind, DefaultActionMetaType, DefaultActionPayloadType } from "../action/action";

/**
 * Defines a start action.
 */
export interface StartAction<Start, Meta> extends Action<Start, Meta> {
	status: ActionStatusKind.START;
	error: false;
	payload: Start;
	meta: Meta;
}

/**
 * Defines a success action.
 */
export interface SuccessAction<Success, Meta> extends Action<Success, Meta> {
	status: ActionStatusKind.SUCCESS;
	error: false;
	payload: Success;
	meta: Meta;
}

/**
 * Defines a failure action.
 */
export interface FailureAction<Failure, Meta> extends Action<Failure, Meta> {
	status: ActionStatusKind.FAILURE;
	error: true;
	payload: Failure;
	meta: Meta;
}

/**
 * Defines an discriminated union used if needing to switch/case "status" field type guarded.
 */
export type AsyncAction<Start = DefaultActionPayloadType, Success = DefaultActionPayloadType, Failure = DefaultActionPayloadType, Meta = DefaultActionMetaType> =
	StartAction<Start, Meta>
	| SuccessAction<Success, Meta>
	| FailureAction<Failure, Meta>;
