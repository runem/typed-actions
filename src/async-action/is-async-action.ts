import { Action } from "../action/action";
import { AsyncAction } from "./async-action";
import { AsyncActionCreator, AsyncActionCreatorWithMeta } from "./async-action-creator";

/**
 * Checks if the "action" has been made from a specific "actionCreator".
 * This function returns a discriminated union that can be used to switch/case the "status" field if that's your style of programming.
 * @param action
 * @param actionCreator
 */
export function isAsyncAction<Start, Success, Failure, Meta> (action: Action<unknown, unknown>, actionCreator: AsyncActionCreator<Start, Success, Failure, Meta> | AsyncActionCreatorWithMeta<Start, Success, Failure, Meta>): action is AsyncAction<Start, Success, Failure, Meta> {
	return action.id === actionCreator.id;
}