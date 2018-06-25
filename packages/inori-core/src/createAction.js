export function createAction(type) {
  return (payload, extra, after) => {
    return {
      type,
      payload,
      after,
      extra
    };
  }
}
