# wow
Inspired by Dva.  
basic package based on reudx, redux-observable.

#### compared to dva：
##### G：
* 没有侵入性
* 预留default reducer处理，支持高阶reducer
* 对旧项目友好，改造成本极低
* 能够使用rx 方法，对异步有强处理能力

##### NG:
* 强依赖rxjs，比较笨重


### Install
```
npm install inori
```

### peer dependency
```
    "react",
    "react-dom",
    "react-redux",
    "redux",
    "redux-observable",
    "rxjs",
```

### Usage

write model:
```
const model = {
  namespace: 'coupon',
  state: {
    details: {},
    records: [],
  },
  epics:{
    loadCopon: (action$, store) => {
      return action$.ofType('coupon/loadCoupon')
        .map((action) => {
          return {type: 1}
        });
    },
  },
  reducers: {
    showLoading(state, action){
      return {...state, loading: true};
    },
    // handle high order reducer
    default(state, action){
      return state;
    }
  }
};


export default model;
```

write page:
```
import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import inori from 'inori';

const {createAction} = inori;

class Page extends PureComponent{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.loadCoupon();
  }


  render(){
    console.log(this.props);

    return (
      <div>
        this is page super
      </div>
    );
  }
}


export default connect((state) => {
  return {state};
}, {
  loadCoupon: createAction('coupon/loadCoupon')
})(Page);
```

write entry file:
```
import inori from 'inori';
import model from './activity/demo/model';
import Page from "./activity/demo/Page";

inori.addModel(model);

inori.start(Page, 'root');

```

### API

```
addModel(model) : add model for inori
```

```
start(Root, 'domId'): start inori
```

```
createAction(actionName): simple action create for connect view
```

```
addReducer(reducerKey, reducerHandle): push origin reducer handle to inori control
```

```
addEpic(epic or epic Array): push origin epic to inori control
```

```
addPlugin(pluginKey, plugin): inject dependency to redux-observable
```

```
addMiddleware(middlewares or middleware): redux middleware
```

### TODO
[ ] replece reducer
[ ] reducer version conflict
[ ] epic replace
