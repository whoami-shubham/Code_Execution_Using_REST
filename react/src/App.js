import React, { Component } from 'react';
import './App.css';
import Editor from './Editor';
import axios from 'axios';

class App extends Component {

     state = {
       lang:'',
       code:'',
       output:'no output'
     }
   updateCode = (code)=>{
     this.setState({code:code});
   }
   updateLang = (event)=>{
      const {name,value} = event.target;
      this.setState({[name]:value});
   }
   submitCode = ()=>{
     if(this.state.lang==''){
       alert("please select a language !");
     }
     else{
  
      axios({
        method: 'post',
        url: 'http://cors-anywhere.localhost:4000/',
        data: {
          lang:this.state.lang,
          code:this.state.code
        }
      })
      .then((data)=>{
         console.log(data.data);
         this.setState({output:data.data.output});
      })
      .catch(function (error) {
        console.log(error);
      });
     }
   }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <select name="lang" onChange={this.updateLang}>
            <option value="">select</option>
            <option value="c">c</option>
            <option value="cpp">c++</option>
            <option value="py">python</option>
          </select>
          <Editor update={this.updateCode}/>
          <button onClick={this.submitCode} className="btn btn-primary">run</button>
          <pre className="col-7" style={{overflow:'auto',color:'white',maxHeight:'500px'}}>{this.state.output}</pre>
        </header>
      </div>
    );
  }
}

export default App;
