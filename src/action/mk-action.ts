import { OptionalSpreadTuple } from "../helper";
import { Action, ActionIdType, ActionStatusKind, DefaultActionMetaType, DefaultActionPayloadType } from "./action";

/**
 * Creates an action object.
 * Payload and metadata is optional if their corresponding type is undefined.
 * @param id
 * @param status
 * @param payloadAndMeta
 */
export function mkAction<Payload = DefaultActionPayloadType, Meta = DefaultActionMetaType> (id: ActionIdType, status: ActionStatusKind, ...payloadAndMeta: OptionalSpreadTuple<Payload, Meta>): Action<Payload, Meta> {
	return {
		type: `${id}/${status}`,
		id,
		status,
		error: status === ActionStatusKind.FAILURE,
		payload: payloadAndMeta[0]!,
		meta: payloadAndMeta[1]!
	};
}