# @appnest/typed-actions

## What is this?

`typed-actions` is a lightweight library to create and `type check` flux/redux `actions` in typescript. 

*The library doesn't come with a dispatcher, its only purpose is to type check actions.*

### :fire: Features

:sparkles: **Type magic** - Define actions with the least amount of work on your side.

:mag: **Small** - No dependencies. Gzipped size: 483 B.

:vertical_traffic_light: **Built in status** - All statuses come with either a `START`, `SUCCESS` or `FAILURE` status. This removes boilerplate for asynchronous action dispatching.

### :sparkles: Type Magic

Using this library you avoid keeping track of uncomfortable many boilerplate interfaces in order to type check actions in typescript. Read the section [without this library](#without-this-library) to see what typing hell you avoid.

 This is based the following Typescript features, including features from 3.0: [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards), [conditional types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types), [union types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types), [generic rest parameters](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#generic-rest-parameters) and [optional elements in tuple types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#optional-elements-in-tuple-types).

### :vertical_traffic_light: Built in status

All actions created using this library comes with a `status`. This status can be either `START`, `SUCCESS` or `FAILURE`. All actions must have a status because this become very handy when creating actions in an asynchronous flow. This way you avoid a lot of boilerplate (see [without this library](#without-this-library))

##  Example

Let's start with a general example of how you would use this library.

Here we use an async action creator. You only need to define this action creator once for a given action, then it can be used to easily create and typecheck actions with different statuses: `START`, `SUCCESS` and `FAILURE`. This is done using the methods `start`, `success` and `failure` on the async action creator.

```typescript
import { defaultAsyncActionCreator, isAction, Action } from "@appnest/typed-actions";

// 1: Make an action creator
const listUsers = defaultAsyncActionCreator<string[]>("LIST_USERS");

// 2: Create an action
const action = listUsers.success(["John", "Jane"]);
// { type: "LIST_USERS/SUCCESS", payload: ["John", "Jane"], id: "LIST_USERS", status: "SUCCESS" }

// 3: Dispatch the action any way you like

// 4: Handle the action in a store
function handler (action: Action) {

  if (isAction(action, listUsers.success)) {
    // Payload is type of "string[]" in this scope.
    console.log(action.payload.join(", "));

  } else if (isAction(action, listUsers.failure)) {
    // Payload is type of "Error" in this scope.
    console.log(`Something went wrong: ${action.payload.message}`)
  }

}
```

## Walkhrough

### Step 1: Make an action creator
In order to generate type safe actions you will first need to make an action creator. `actionCreator` takes a generic parameter that becomes the type of the action payload.

```typescript
import { actionCreator } from "@appnest/typed-actions";

const sendMsg = actionCreator<string>("SENG_MSG_ACTION");
```

### Step 2: Create the action
The action creator can now be used to create actions with a payload of the specified type.

```typescript
const action = sendMsg("Hello World");
```

Here's the content of this action. 

```
{ 
  type: "MY_ACTION/SUCCESS",
  id: "MY_ACTION",
  status: "SUCCESS",
  payload: "Hello World",
  meta: undefined
}
```

You will notice that the status is "SUCCESS". All actions must have a status becauses this become very handy when spawning actions in an asynchronous flow. "SUCCESS" is the default status.

### Step 3: Dispatch the action

The action can be dispatched any way you like (for example redux `store.dispatch(action)`). This library is only build for creating and typechecking actions, not for dispatching them.

### Step 4: Handle the action

Now you are ready to check the action type. This is done using the `isAction` function.

```typescript
import { isAction, Action } from "@appnest/typed-actions";

function handler (action: Action) {

  // Check if "action" is of type "sendMsg"
  if (isAction(action, sendMsg)) {

    // Type of "payload" is "string" in this scope
    console.log(action.payload); 

  }

}
```

## Without this library

Here is an example of what you would have to do if you did not use this library. Typed actions are achieved using [discriminated unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions). In addition it's difficult to automate dispatching eg. `failure` actions because the `status` is baked into the type.

```typescript
// 1: Make a bunch of interfaces
interface ListUserStartAction {
  type: "LIST_USER/START";
}

interface ListUserSuccessAction {
  type: "LIST_USER/SUCCESS";
  payload: string[];
}

interface ListUserFailureAction {
  type: "LIST_USER/FAILURE";
  payload: Error;
}

type Action = ListUserStartAction | ListUserSuccessAction | ListUserFailureAction;

// 2: Create an action
const action: Action = {
  type: "LIST_USER/SUCCESS",
  payload: ["John", "Jane"]
};

// 3: Dispatch the action

// 4: Handle the action
function handler (action: Action) {
  switch (action.type) {

    case "LIST_USER/SUCCESS":
      // Payload is type of "string[]" in this scope.
      console.log(action.payload.join(", "));
      break;

    case "LIST_USER/FAILURE":
      // Payload is type of "Error" in this scope.
      console.log(`Something went wrong: ${action.payload.message}`);
      break;
  }
}
```