/**
 * Type for the "id" field of actions.
 */
export type ActionIdType = string;

/**
 * Default type for action payload if not specified.
 */
export type DefaultActionPayloadType = void;

/**
 * Default type for action metadata if not specified.
 */
export type DefaultActionMetaType = void;

/**
 * All actions come with a "status" field.
 */
export enum ActionStatusKind {
	START = "START",
	SUCCESS = "SUCCESS",
	FAILURE = "FAILURE"
}

/**
 * Default action to use when the user doesn't specify an action status.
 */
export const DEFAULT_ACTION_STATUS_KIND = ActionStatusKind.SUCCESS;

/**
 * The action type used for all action.
 * This type can be used with and without generic parameters.
 * If generic parameters aren't specified it defaults to the "unknown" type.
 */
export type Action<Payload = unknown, Meta = unknown> = {
	type: string;
	id: ActionIdType;
	status: ActionStatusKind;
	payload: Payload;
	meta: Meta;
	error: boolean;
}
