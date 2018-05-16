
function getAction(type) {
  return (payload, after) => {
    return {
      type,
      payload,
      after
    };
  }
}

function createAction(type){
  return getAction(type);
}

export default createAction;
