import React, { useEffect } from 'react'
import Information from './Information'
import RecordDisplay from './RecordDisplay'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PieChart from './PieChart'
import VerticalBarChart from './VerticalBarChart'
import axios from '../api/axios'

/**
 * Module Name: Dashboard.js
 * Date of Creation: 27/08/2022
 * Creator: Hao Xu
 * Summary: Dashboard page for user, most of the functionality is here
 * Variable Accessed: 
 */

const GET_URL='api/records/dashboard';

const Dashboard = () => {
  
  //get username
  const {auth} =useAuth();
 
  const userName=auth.user;
  

  const [search, setSearch]=useState('');
  const [searchResult, setSearchResult]=useState([]);


  const [expenditure, setExpenditure]=useState('');
  const [income, setIncome]=useState('');

  //set and get date
  const [date,setDate]=useState(new Date());
  const [records, setRecord]=useState([]);

  const [pieDataSet,setPieDataSet]=useState([]);
  const [wholeYearIncome,setWholeYearIncome]=useState([]);
  const [wholeYearExpenditure, setWholeYearExpenditure]=useState([]);



  //filter the records according to the searchResult
  useEffect(()=>{

    //sort records according to dates
    records.sort(function(a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return d-c;
    });

    const filteredResults=records?.filter((record)=>
    ((record.description)?.toLowerCase())?.includes(search?.toLowerCase())
    ||((record.classification)?.toLowerCase())?.includes(search?.toLowerCase()));

    setSearchResult(filteredResults);

    if (filteredResults.length===0){
      setSearchResult(records);
     
      console.log(searchResult);
    }

 
  },[records,search])

  //useEffect to get newest records when first rendering
  useEffect(()=>{
    const fetchRecords=async()=>{
      try{
        const response=await axios.get(GET_URL,{headers:{
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization' : JSON.parse(localStorage.getItem('accessToken'))}
          }
        )

        setRecord(response.data.data);
        
      }catch(err){
          console.error(err);
      }
    }

    fetchRecords();
    
  },[])

  //useEffect to draw graph when records,date,expenditure changes.
  useEffect(()=>{
    setPieDataSet(calculatePercentage(records,date,expenditure));
  },[records,date,expenditure])

  useEffect(()=>{
    setWholeYearIncome(calculateIncomeWholeYear(records,date));
    setWholeYearExpenditure(calculateExpenditureWholeYear(records,date));
  },[records,date])

  //function to calculate percentage of spending on each different categories
  const calculatePercentage=(records,selectedDate,allExpen)=>{
    var rentPer=0;
    var petPer=0;
    var medicalPer=0;
    var shoppingPer=0;
    var transportPer=0;
    var giftPer=0;
    for (let i=0;i<records.length;i++){
     
      if (parseInt(records[i].date.substring(0,2))===selectedDate.getMonth()){
        let classification=records[i].classification;
        if (classification==='pet'){
          petPer-=records[i].money;
        }
        else if(classification==='rent'){
          rentPer-=records[i].money;
        }
        else if (classification==='medical'){
          medicalPer-=records[i].money;
        }
        else if (classification==='transport'){
          transportPer-=records[i].money;
        }
        else if (classification==='gift'){
          giftPer-=records[i].money;
        }
        else if (classification==='shopping'){
          shoppingPer-=records[i].money;
        }
      }
    
    }

    var positiveExpenditure=allExpen*(-1);

    return [transportPer/positiveExpenditure,medicalPer/positiveExpenditure,giftPer/positiveExpenditure,
    petPer/positiveExpenditure,shoppingPer/positiveExpenditure,rentPer/positiveExpenditure];
    
  }

  const calculateIncomeWholeYear=(records,selectedDate)=>{
    var JanIncome=0;
    var FebIncome=0;
    var MarIncome=0;
    var AprIncome=0;
    var MayIncome=0;
    var JunIncome=0;
    var JulIncome=0;
    var AugIncome=0;
    var SepIncome=0;
    var OctIncome=0;
    var NovIncome=0;
    var DecIncome=0;
    
    for (let i=0;i<records.length;i++){
      if (parseInt(records[i].date.substring(6,10))===selectedDate.getFullYear()){
        if (records[i].money>0){
          if (parseInt(records[i].date.substring(0,2))===0){
            JanIncome+=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===1){
            FebIncome+=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===2){
            MarIncome+=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===3){
            AprIncome+=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===4){
            MayIncome+=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===5){
            JunIncome+=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===6){
            JulIncome+=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===7){
            AugIncome+=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===8){
            SepIncome+=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===9){
            OctIncome+=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===10){
            NovIncome+=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===11){
            DecIncome+=records[i].money;
          }
          
        }
         
      }
    }


    return [JanIncome,FebIncome,MarIncome,AprIncome,MayIncome,JunIncome,JulIncome,AugIncome,SepIncome,OctIncome,NovIncome,DecIncome];
  }

  const calculateExpenditureWholeYear=(records,selectedDate)=>{
    var JanExp=0;
    var FebExp=0;
    var MarExp=0;
    var AprExp=0;
    var MayExp=0;
    var JunExp=0;
    var JulExp=0;
    var AugExp=0;
    var SepExp=0;
    var OctExp=0;
    var NovExp=0;
    var DecExp=0;
    
    for (let i=0;i<records.length;i++){
      if (parseInt(records[i].date.substring(6,10))===selectedDate.getFullYear()){
        if (records[i].money<0){
          if (parseInt(records[i].date.substring(0,2))===0){
            JanExp+=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===1){
            FebExp-=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===2){
            MarExp-=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===3){
            AprExp-=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===4){
            MayExp-=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===5){
            JunExp-=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===6){
            JulExp-=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===7){
            AugExp-=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===8){
            SepExp-=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===9){
            OctExp-=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===10){
            NovExp-=records[i].money;
          }
          else if(parseInt(records[i].date.substring(0,2))===11){
            DecExp-=records[i].money;
          }
          
        }
         
      }
    }


    return [JanExp,FebExp,MarExp,AprExp,MayExp,JunExp,JulExp,AugExp,SepExp,OctExp,NovExp,DecExp];
  }


 

 
 


  return (
    <>
      <Information search={search} setSearch={setSearch} date={date} setDate={setDate} expenditure={expenditure} income={income}></Information>
      <h2 class="headertekst">
        <span className='line'><Link to='/Add'>add</Link></span>
        
      </h2>
      <RecordDisplay records={records} setExpenditure={setExpenditure} date={date} setIncome={setIncome} searchResult={searchResult} ></RecordDisplay>
      <div className='PieChartBackGround'> </div>
      <div className='PieChartContainer'> <PieChart pieDataSet={pieDataSet}></PieChart></div>
      <div className='VerticalBarChartBackground'> </div>
      <div className='VerticalBarChartContainer'><VerticalBarChart wholeYearIncome={wholeYearIncome} wholeYearExpenditure={wholeYearExpenditure}></VerticalBarChart></div>
     
     
    </>
  )
}

export default Dashboard