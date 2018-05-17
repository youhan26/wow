export function createAction(type) {
  return (payload, after) => {
    return {
      type,
      payload,
      after
    };
  }
}
