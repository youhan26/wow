# wow

### Install
```
npm install inori
```

### peer dependency
```
    "react": "^15.3.2",
    "react-dom": "^15.3.2",
    "react-redux": "^5.0.7",
    "redux": "^3.0.0",
    "redux-observable": "^0.18.0"
    "rxjs": "^5.0.0",
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
addModel
```

```
start
```

```
createAction
```
