import React,{Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
 
export default class Editor extends Component{
     state = {
         content:"/* write code here */"
     }

     onChange = (newValue)=> {
        this.setState({content:newValue});
        this.props.update(newValue);
      }
       
      render(){
          return (
            <AceEditor
                    placeholder="Placeholder Text"
                    mode="javascript"
                    theme="github"
                    name="editor"
                    onLoad={this.onLoad}
                    onChange={this.onChange}
                    fontSize={16}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={this.state.content}
                    setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                    }}
            />
          )
      }
}