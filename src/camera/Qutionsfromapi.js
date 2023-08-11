import React,{useState} from 'react'; 
import { useNavigate } from 'react-router-dom';
const Qutionsfromapi=()=>{
    const navigate=useNavigate();
    const [selectedOption,setSelectedOption] = useState('');
    const onvaluechange=(e)=>{
       setSelectedOption(e.target.value)
    }
    return(
       <div>
          <h3 style={{textAlign:'center'}}>Sample Test</h3>
          <p style={{marginLeft:'8%'}}>Choose the correct answer for the questions:</p>
          <div style={{marginLeft:'8%'}}>
            <div style={{height:'60px',width:'70%',border:'1px solid black'}}>
                <p style={{marginLeft:'2%'}}>1.What is the Full Form of API?</p>

            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
            <input type="radio" value="Application Programming Interface" name="options" onChange={onvaluechange} style={{width:'26px',height:'26px',margin:'1%'}}/>
            <p style={{marginLeft:'2%'}}>Application Programming Interface</p>
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
            <input type="radio" value="option2" name="options" onChange={onvaluechange} style={{width:'26px',height:'26px',margin:'1%'}}/>
            <p style={{marginLeft:'2%'}}>Applied Programming Interface</p>
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
            <input type="radio" value="option3" name="options" onChange={onvaluechange} style={{width:'26px',height:'26px',margin:'1%'}}/>
            <p style={{marginLeft:'2%'}}>Application Performing Interface</p>
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
            <input type="radio" value="option4" name="options" onChange={onvaluechange} style={{width:'26px',height:'26px',margin:'1%'}}/>
            <p style={{marginLeft:'2%'}}>None of these</p>
            </div>
            <p>{selectedOption}</p>
            <div style={{textAlign:'center'}}>
               <button style={{backgroundColor:'limegreen',height:'40px',width:'160px'}} onClick={()=>navigate('/')}>Next</button>
            </div>
          </div>
       </div>
    )
}
export default Qutionsfromapi;