/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import ReactDOM from 'react-dom';
import ChatWidget from './components/chat'

let init = null;

export default {
  config: (config={
    selector: "#chat-app",
    apiKey: "123123123"
  }) =>{
      init = config;
  },
  widgets: {
    myWidget: {
      new: () => {
        return {
          render: () => {
            console.log(init, "init")
            ReactDOM.render(<ChatWidget 
                clientKey={init.apiKey}
                selector={init.selector}  
            />, document.querySelector(init.selector));
          },
          unmount(){
            ReactDOM.unmountComponentAtNode(document.querySelector(init.selector)); 
          },
        }
      }
    }
  }
}