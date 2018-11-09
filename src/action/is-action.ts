import { Action } from "./action";
import { ActionCreator, ActionCreatorWithMeta } from "./action-creator";

/**
 * Checks if an action was made from a specific action creator using a type guard.
 * An action is created by an action creator if "id" and "status" of the action corresponds to the action creator.
 * @param action
 * @param actionCreator
 */
export function isAction<Payload, Meta> (action: Action<unknown, unknown>, actionCreator: ActionCreator<Payload, Meta> | ActionCreatorWithMeta<Payload, Meta>): action is Action<Payload, Meta> {
	return action.id === actionCreator.id && action.status === actionCreator.status;
}