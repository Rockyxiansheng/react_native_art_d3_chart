import React,{Component} from 'react';
import {View, Text, StyleSheet, ART, TouchableHighlight} from 'react-native';
const {
  Surface,
  Group,
  Rectangle,
  ClippingRectangle,
  LinearGradient,
  Shape,
} = ART;

import AnimShape from './AnimShape';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as format from 'd3-format';
import * as axis from 'd3-axis';

const d3 = {
  scale,
  shape,
  format,
  axis,
};

import {
    scaleBand,
    scaleLinear
} from 'd3-scale';

const X_MARGIN = 8;
const Y_MARGIN = 25;

export default class Chart extends Component {
  constructor(props){
    super(props)

    this.state = {
      selected:0,
      month:'Dec',
      values:{
        'Dec': 17.98,
        'Jan': 18.56,
        'Feb': 19.20,
        'Mar': 20.56,
        'Apr': 20.95
      },
      yAxis:{
        min: 15,
        max: 27,
        interval: 2
      },
      multipplier:{
        'Dev':0,
        'Jan':1,
        'Feb':2,
        'Mar':3,
        'Apr':4
      }
      ,
      spendingsPerYear: [
       {year: 'DEC', value: 17.98},
       {year: 'JAN', value: 18.56},
       {year: '2014', value: 19.20},
       {year: 'FEB', value: 20.56},
       {year: 'MAR', value: 20.95}
  ]
    }
    const _drawXAxis = this._drawXAxis.bind(this);

  }
  _drawYAxis(){
    let {min, max, interval} = this.state.yAxis;
    const count = (max-min)/interval;
    let array = [];
    for(i=0;i<count;i++){
      array.push(<Text style={styles.YAxisPoint} key={i}>{Number(min)+Number(interval)*i}%</Text>)
    }
    return array.reverse();
  }
  _drawXAxis(){
    let array = [];
    let { values } = this.state;
    for (var k in values){
      if (values.hasOwnProperty(k)) {
         array.push(
           <TouchableHighlight style={{

           }} key={k} onPress={this._monthClick.bind(this,k)}  ><Text style={styles.XAxisPoint}>{k}</Text></TouchableHighlight>
         );
       }
    }
    return array;
  }
  _monthClick(month){
    this.setState({...this.state, selected: this.state.multipplier[month], month: month});
  }
  _Yvalue(item, index) { return -item.value*50 ; }


 _Xvalue(item, index) { return index*155; }

  _createArea() {
   var that = this;
   var area = d3.shape.area()
       .x(function(d, index) { return that._Xvalue(d, index); })
       .y(function(d, index) { return that._Yvalue(d, index); })
       .curve(d3.shape.curveBasisOpen)
       (this.state.spendingsPerYear)

   return { path : area };
 }
  render(){
    const x = X_MARGIN - 150;
    const y = 1120-X_MARGIN;
     return (
       <View style={styles.container}>
         <View style={styles.tickXContainer}>
           {this._drawXAxis()}
         </View>
         <View style={styles.tickYContainer}>
           {this._drawYAxis()}
         </View>
         <View style={styles.canvas}>
           <Surface width="340" height="240">
           <Group x={x} y={y}>
             <AnimShape
               color='#9600FD'
               d={() => this._createArea()}
                />
           </Group>
        </Surface>
         </View>
         <View style={[styles.line, {
           marginLeft: X_MARGIN*9*this.state.selected
         }]}></View>
         <View style={[styles.detail, {
           marginLeft: X_MARGIN*9*this.state.selected
         }]}>
           <Text style={styles.bigText}>Percentage</Text>
           <Text style={styles.smallText}>{this.state.values[this.state.month]}</Text>
           <Text style={styles.bigText}>Projected Return</Text>
         </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
  marginTop:40,
  },
  tickYContainer:{
    position: 'absolute',
    top: 30,
    left: 0,
  },
  YAxisPoint:{
    left: 0,
    backgroundColor: 'transparent',
    marginTop:Y_MARGIN,
    flexDirection:'column-reverse',
    color: '#fff'
  },
  tickXContainer:{
    flexDirection:'row',
    top:0,
    left:0,
    marginLeft: 30
  },
  XAxisPoint:{
    paddingRight:40,
    color: '#fff',
    fontSize:15,
    fontWeight: '900',
    marginLeft: X_MARGIN
  },
  canvas:{
    right:0,
    width:340,
    left:30,
    top:30,
    height:240
  },
  line:{
    position: 'absolute',
    width:1,
    height:290,
    borderColor:'#fff',
    borderWidth: 1,
    marginTop:0,
    left:60
  },
  bigText:{
    fontSize:13,
    fontWeight:'bold',
    color:'#9600FD',
    backgroundColor:'transparent',
    textAlign:'center'

  },
  smallText:{
    color:'#fff',
    backgroundColor:'transparent',
    textAlign:'center'
  },
  detail:{
    position: 'absolute',
    marginTop: 30,
    marginLeft:0,
    top:260,
    left:5
},
button:{
  margin:40,
  backgroundColor: '#fff'
}
})
