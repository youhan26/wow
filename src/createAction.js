export function createAction(type) {
  return (payload, ...others) => {
    return {
      type,
      payload,
      ...others
    };
  }
}
