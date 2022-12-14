import React, { Component } from 'react';
import './dashboardcss/month-picker.css';
import './dashboardcss/picker-styles.css';

/**
 * Module Name:mPicker.js 
 * Date of Creation: //
 * Creator://
 * Summary: a internet library been downloaded to help our web application
 * Variable Accessed: 
 */

export default class Picker extends Component {

    constructor(props){
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        super(props);
        if(this.props.months && this.props.months.length === 12)
            months = this.props.months;

        this.state = {cells:[], selectedDate: new Date(0), currentView:"years",renderDate:false, months:months};
        this.selectCell = this.selectCell.bind(this);
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    componentWillMount(){
        let cells =[];
        let year = new Date().getFullYear() - 6 ;
        for(let i = 0 ; i< 12 ; i++)
            cells.push(year+i);
        this.setState({cells:cells});
    }

    selectCell(cellContent, index){
        if(typeof cellContent === 'number'){
            let date = this.state.selectedDate;
            date.setFullYear(cellContent);
            this.setState({selectedDate:date});

            let months = this.state.months;
            this.setState({currentView:"months",renderDate:false});
            this.setState({cells:months});
        }else{
            let date = this.state.selectedDate;
            date.setMonth(index);
            this.setState({selectedDate:date, renderDate:true});
            if(this.props.onChange && typeof this.props.onChange === "function")
                this.props.onChange(this.state.selectedDate);
        }
    }

    previous(){
        if(this.state.currentView === "years"){
            let years = this.state.cells;
            for(let i=0; i<12 ; i++)
                years[i] -= 12;
            this.setState({cells:years, renderDate:false});
        }else{
            let cells =[];
            let year = new Date().getFullYear() - 6 ;
            for(let i = 0 ; i< 12 ; i++)
                cells.push(year+i);
            this.setState({cells:cells});
            this.setState({currentView:"years", renderDate:false});
        }
    }

    next(){
        if(this.state.currentView === "years"){
            let years = this.state.cells;
            for(let i=0; i<12 ; i++)
                years[i] += 12;
            this.setState({cells:years, renderDate:false});
        }else{
            let cells =[];
            let year = new Date().getFullYear() - 6 ;
            for(let i = 0 ; i< 12 ; i++)
                cells.push(year+i);
            this.setState({cells:cells});
            this.setState({currentView:"years", renderDate:false});
        }
    }

    render() {
        let selectedString="";
        if(this.state.renderDate){
            let selectedMonth = this.state.selectedDate.getMonth()+1;
            let selectedYear =  this.state.selectedDate.getFullYear();
            let monthString = (selectedMonth)>9 ? selectedMonth : "0"+selectedMonth;
            selectedString = monthString+"-"+selectedYear;
        }
        let head =
            <div className="section_mp group_mp">
                <div className="col_mp span_1_of_3_mp arrows_mp" onClick={()=>{this.previous()}}>&lt;</div>
                <div className="col_mp span_1_of_3_mp selected_date_mp">{selectedString}</div>
                <div className="col_mp span_1_of_3_mp arrows_mp" onClick={()=>{this.next()}}>&gt;</div>
            </div>;
        let body = [];
        for( let i = 0 ; i< 12 ; i++){
            let cellContent = this.state.cells[i];
            body.push(<div key={i}  onClick={()=>{this.selectCell(cellContent, i)}} className={"col_mp span_1_of_3_mp"}>{cellContent}</div>);
        }


        return (
                <div>
                    {head}
                    {body}
                </div>
        );
    }

}