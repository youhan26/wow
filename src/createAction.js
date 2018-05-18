export function createAction(type) {
  return (payload, after, extra) => {
    return {
      type,
      payload,
      after,
      extra
    };
  }
}
