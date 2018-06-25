import {createEpicMiddleware} from "redux-observable";

/**
 * @param epics
 * @param plugins
 * @returns {EpicMiddleware<Action, any, any, Action>}
 */
const getEpicMiddleware = (epics, plugins) => {
  return createEpicMiddleware(epics, {
    dependencies: plugins || {}
  });
};

export default getEpicMiddleware;