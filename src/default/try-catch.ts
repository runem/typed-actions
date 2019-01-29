import { Action } from "../action/action";
import { DefaultAsyncActionCreatorWithMeta } from "./default-async-action-creator";

/**
 * Returns a curried function with a action dispatcher function.
 * The returned function will take an "actionCreator" and a async "handler" function that must return a successful value.
 * If the "handler" function throws an error a "failure" action will be dispatched an the error will be rethrown.
 * The function will always dispatch a "start" action.
 * @param dispatch
 */
export const tryCatchDispatch = (dispatch: ((action: Action) => void)) =>
	async <Success, Meta> (actionCreator: DefaultAsyncActionCreatorWithMeta<Success, Meta>, handler: () => Promise<Success> | Success): Promise<Success> => {
		dispatch(actionCreator.start());

		try {
			const data = await handler();
			// @ts-ignore
			dispatch(actionCreator.success(data));
			return data;

		} catch (e) {
			dispatch(actionCreator.failure(e));
			throw e;
		}
	};