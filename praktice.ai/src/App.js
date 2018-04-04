import React, { Component } from 'react';
import Picker from 'react-mobile-picker';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGroups1: {
        title: 'Mr.'
      }, 
      optionGroups1: {
        title: ['Mr.', 'Mrs.', 'Ms.', 'Dr.'],
      },
      valueGroups2: {
        firstName: 'Micheal',
        secondName: 'Jordan'
      }, 
      optionGroups2: {
        firstName: ['John', 'Micheal', 'Elizabeth'],
        secondName: ['Lennon', 'Jackson', 'Jordan', 'Legend', 'Taylor']
      },
      noHours: false
    };
  }

  data = {
    "template_type": "slot_picker",
    "selection_color": "#000000",
    "secondary_color": "#808080",
    "title": "Available Slots for Dr. Sumit",
    "available_slots": [
      {
        "date": "Wed, Dec 06",
        "date_slots": []
      },
      {
        "date": "Thu, Dec 07",
        "date_slots": []
      },
      {
        "date": "Fri, Dec 08",
        "date_slots": []
      },
      {
        "date": "Sat, Dec 09",
        "date_slots": []
      },
      {
        "date": "Today",
        "date_slots": [
          {
            "hour": "8",
            "hour_slots": [
              {
                "08:10 AM": "slotId001"
              },
              {
                "08:50 AM": "slotId005"
              }
            ]
          },
          {
            "hour": "3",
            "hour_slots": [
              {
                "03:00 PM": "slotId005"
              },
              {
                "03:30 PM": "slotId007"
              }
            ]
          }
        ]
      },
      {
        "date": "Tomorrow",
        "date_slots": []
      },
      {
        "date": "Wed, Dec 13",
        "date_slots": [
          {
            "hour": "4",
            "hour_slots": [
              {
                "04:30 PM": "slotId105"
              },
              {
                "04:50 PM": "slotId106"
              }
            ]
          },
          {
            "hour": "5",
            "hour_slots": [
              {
                "05:30 PM": "slotId202"
              },
              {
                "05:45 PM": "slotId208"
              }
            ]
          }
        ]
      }
    ]
  };    

  componentDidMount(){
    let vg1 = {date:'Today'}, vg2 = {hour:'', slot:''}, og1 = {date:[]}, og2 = {hour:[], slot:[]};   
    this.data.available_slots.forEach(function(slot, index){
      (slot.date_slots.length !== 0) ? og1.date.push(slot.date) : og1.date.push(<del>{slot.date}</del>)
      slot.date_slots.forEach(function(hslot, index2){
        if(index === 0) {
          vg2.hour = hslot.hour;
          vg2.slot = Object.keys(hslot.hour_slots)[0];
        }
        og2.hour.push(hslot.hour);
        hslot.hour_slots.forEach(function(slot){
          og2.slot.push(Object.keys(slot)[0]);
        });
      });
    });
    this.setState({
      valueGroups1 : vg1,
      valueGroups2 : vg2,
      optionGroups1 : og1,
      optionGroups2 : og2      
    });
  }

  change = () => {
    let og2 = {hour:[], slot:[]}, vg1 = this.state.valueGroups1, vg2 = this.state.valueGroups2;
    this.data.available_slots.forEach(function(slot, index){
      console.log(vg1.date, slot.date)
      if(slot.date.indexOf(vg1.date) !== -1){
        console.log("ok");
        slot.date_slots.forEach(function(hslot, index){
          og2.hour.push(hslot.hour);
          console.log(vg2);
          hslot.hour_slots.forEach(function(slot){
            if(hslot.hour === vg2.hour) {
              og2.slot.push(Object.keys(slot)[0]);
            }
          });
        });
      }
    });
    if(og2.hour[0]){
      this.setState({
        noHours: false,
        valueGroups2: {"hour": og2.hour[0]},
        optionGroups2: og2
      })
    } else {
      this.setState({
        noHours: true,
        valueGroups2: {'hour': 'No Slots Available on This Day'},
        optionGroups2: {'hour': ['No Slots Available on This Day']}
      })
    }
  };


  // Update the value in response to user picking event
  handleChange1 = (name, value) => {
    this.setState(({valueGroups1}) => ({
      valueGroups1: {
        ...valueGroups1,
        [name]: value
      },
    }), this.change);
  };
  handleChange2 = (name, value) => {
    this.setState(({valueGroups2}) => ({
      valueGroups2: {
        ...valueGroups2,
        [name]: value
      }
    }));
  };  
  
  render() {
    const {optionGroups1, valueGroups1, optionGroups2, valueGroups2} = this.state;
    return (
      <div className="App">
        <div className="container">
          <h1>{this.data.title}</h1>
          <div className="is-column-1by3">
            <Picker ref="p1"
              optionGroups={optionGroups1}
              valueGroups={valueGroups1}
              onChange={this.handleChange1} 
            />
          </div>
          <div className="is-column-2by3">
            <div className={this.state.noHours ? 'has-no-slot' : ''}>
              <Picker ref="p1"
                optionGroups={optionGroups2}
                valueGroups={valueGroups2}
                onChange={this.handleChange2} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
