import { IfVoid, OptionalSpreadTuple, OptionalSpreadTupleAlwaysOptional } from "../helper";
import { Action, ActionIdType, ActionStatusKind, DEFAULT_ACTION_STATUS_KIND, DefaultActionMetaType, DefaultActionPayloadType } from "./action";
import { mkAction } from "./mk-action";

type P = DefaultActionPayloadType;
type M = DefaultActionMetaType;

/**
 * The base of actions creators.
 * Every action creator comes with an "id" and "status" in order to type guard with the "isAction" function.
 */
export interface ActionCreatorBase<Payload, Meta> {
	id: ActionIdType;
	status: ActionStatusKind;
}

/**
 * An action creator which is a function used to make actions.
 */
export interface ActionCreator<Payload = P, Meta = M> extends ActionCreatorBase<Payload, Meta> {
	(...args: OptionalSpreadTuple<Payload, Meta>): Action<Payload, Meta>;
}

/**
 * An action creator with pre assigned "meta".
 * This can be used to create actions with specific metadata without needing to specify metadata every time.
 */
export interface ActionCreatorWithMeta<Payload = P, Meta = M> extends ActionCreatorBase<Payload, Meta> {
	meta: Meta;
	(...args: OptionalSpreadTupleAlwaysOptional<Payload, Meta>): Action<Payload, Meta>;
}

/**
 * Creates an action creator that binds a specific "id" and "status".
 * An action creator is a function that can be called to create an action.
 * If needed the action creator can be assigned an optional metadata which makes it possible create actions without needing to add the metadata every time.
 * @param id
 * @param status
 */
export function actionCreator<Payload = P, Meta = M> (id: ActionIdType, status?: ActionStatusKind): IfVoid<Meta, ActionCreatorWithMeta<Payload, Meta>, ActionCreator<Payload, Meta>>;
export function actionCreator<Payload = P, Meta = M> (id: ActionIdType, status: ActionStatusKind, defaultMeta: Meta): ActionCreatorWithMeta<Payload, Meta>;
export function actionCreator<Payload = P, Meta = M> (id: ActionIdType, status: ActionStatusKind = DEFAULT_ACTION_STATUS_KIND, defaultMeta?: Meta): ActionCreator<Payload, Meta> | ActionCreatorWithMeta<Payload, Meta> {

	// The action creator which is a function that makes an action
	const func = (...payloadAndMeta: OptionalSpreadTuple<Payload, Meta>) =>
		// TODO: Make it possible to type mkAction with both required and optional payload.
		// @ts-ignore
		mkAction(id, status, payloadAndMeta[0], payloadAndMeta[1] || defaultMeta);

	// Assign "id", "status" and optional "meta" to the function.
	return Object.assign(func, {id, status, meta: defaultMeta}) as ActionCreator<Payload, Meta>;

}
