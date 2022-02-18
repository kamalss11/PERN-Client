import React,{useEffect, useState} from 'react'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import { Link,useHistory } from 'react-router-dom'
import '../../../CSS/LS.css'
import MaterialTable from 'material-table'
import {FaFileWord} from 'react-icons/fa'
import {IoMdArrowDropdownCircle,IoMdArrowRoundBack} from 'react-icons/io'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Financials(){
    const export_all = ()=>{
        if (!window.Blob) {
            alert('Your legacy browser does not support this action.');
            return;
        }
      
        var html, link, blob, url, css;
        
        // EU A4 use: size: 841.95pt 595.35pt;
        // US Letter use: size:11.0in 8.5in;
        
        css = (
            `<style>@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}div.WordSection1 {page: WordSection1;}table{font-family:Montserrat,sans-serif;width:100%;border-collapse:collapse;}td,th{border:1px gray solid;width:5em;padding:2px;}p{font-size:14px}.flx{display:flex;}.flx .img{wrap-text:square;}.flx .img2{wrap-text:square;}</style>`
        );
        
        html = window.docx.innerHTML;
        blob = new Blob(['\ufeff', css + html], {
          type: 'application/msword'
        });
        url = URL.createObjectURL(blob);
        link = document.createElement('A');
        link.href = url;
        // Set default file name. 
        // Word will append file extension - do not add an extension here.
        link.download = `Document`;   
        document.body.appendChild(link);
        if (navigator.msSaveOrOpenBlob ) navigator.msSaveOrOpenBlob( blob, `Document.doc`); // IE10-11
        else link.click();  // other browsers
        document.body.removeChild(link);
    }
    const [data,setData] = useState()
    const [rps,setRps] = useState([])
    const history = useHistory()
    const [pvalue,setPvalue] = useState('All')
    const [drp,setDrp] = useState(false)
    const [msg,setMsg] = useState('All')
    console.log(data)   

    const call_period = async (prd,value) => {
        try{
            const res = await fetch(`/period/overall/staffs/${prd}/financial_support`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const s_admin = await res.json()
            console.log(s_admin)

            setRps(s_admin.table)
            
            toast.info(value,{autoClose:1000})
            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }
        }catch(err){
            console.log(err)
            history.push('/signin')
        }
    }

    const callAboutPage = async () => {
        try{
            const res = await fetch('/dashboard',{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            })

            const datas = await res.json()
            console.log(datas)
            setData(datas.user)

            if(datas.user[0].roll != 'SuperAdmin'){
                history.push('/signin')
            }
            else{
                console.log(localStorage.getItem('dprt'))
                const ad = await fetch(`/super_admin/overall/staffs/financial_support`,{
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',
                })
    
                const s_admin = await ad.json()
                console.log(s_admin)

                setRps(s_admin.table)
            }
            
            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        callAboutPage()
    },[])
    return(
        <div className="iqac">
            <div id="docx" style={{display:'none'}}>
            <div className="WordSection1">
                <div style={{textAlign: "center"}}>
                <h2>PSG COLLEGE OF ARTS & SCIENCE</h2>
                <p>An Autonomous College – Affiliated to Bharathiar University
                Accredited with A Grade by NAAC (3rd Cycle)
                College with Potential for Excellence (Status awarded by UGC)
                Star College Status Awarded by DBT-MST
                An ISO 9001:2015 Certified Institution
                Civil Aerodrome Post, Coimbatore-641 014
                Tamil Nadu, INDIA,</p>
                </div>
                <div style={{textAlign: 'center'}}>
                    <h2>Internal Quality Assurance Cell (IQAC)</h2>
                    <h2>Overall Teachers provided with financial support  - Staffs Reports</h2>
                    {
                        msg ? 
                        <>
                            {msg === 'All' ? 
                                <h2>Reports</h2> : <>
                                    <h2>Quaterly Report</h2>
                                    <h2>{msg ? msg : null}</h2>
                                </>
                            }
                        </> : null
                    }
                </div>
                <h2>FACULTY DETAILS </h2>
                <h4>5.10 Teachers provided with financial support ( Total - {rps ? rps.length : '0'} )</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Department</th>
                    <th>Name of the faculty</th>
                    <th>Name of the professional body for which membership fee is provided</th>
                    <th>Amount of support (Rs.)</th>
                    <th>File</th>
                </tr>
                {
                    rps ? rps.map((r,i)=>{
                        const {n,file,department,f,amount_support} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{department ? department : '-'}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{f ? f : '-'}</td>
                                <td>{amount_support ? amount_support : '-'}</td>
                                <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>
            </div>
        </div>

            <div style={{margin: '18px 0',textAlign: 'center',lineHeight: '30px',fontWeight: 'bolder'}}>
                <p style={{color: '#39a7e7'}}>Internal Quality Assurance Cell (IQAC)</p>
                <p>Overall Teachers provided with financial support - Staffs Report</p>
                {
                    msg ? 
                    <>
                        {msg === 'All' ? 
                            <p style={{color: '#39a7e7'}}>Reports</p> :
                            <>
                                <p style={{fontSize: '14px'}}>Quaterly Report</p>
                                <p style={{color: '#39a7e7'}}>{msg ? msg: null}</p>
                            </>
                        }
                    </> : null
                }
            </div>

            <div className='select'>
            <p><b>Filter by Period</b></p>
            <p className='msg' onClick={e=>setDrp(!drp)}>{pvalue ? pvalue : ''}<IoMdArrowDropdownCircle style={{color: '#0093E9'}} className={`${drp ? 'active' : ''}`} /></p>
                <div className={`${drp ? 'active exp' : ' exp'}`} style={{backgroundColor: 'rgb(0, 147, 233)' ,backgroundImage: 'linear-gradient(160deg, rgb(0, 147, 233) 0%, rgb(128, 208, 199) 100%)', color: 'rgb(255, 255, 255)',zIndex:20}}>
                <p onClick={e=>{callAboutPage();setMsg('All');toast.info("All",{autoClose:1000});setPvalue('All');setDrp(!drp)}}>All</p>
                <p onClick={e=>{call_period(`'2019-07-01' and '2019-09-30'`,'July - September(2019)');setMsg(`July (01/07/2019) to September (30/09/2019)`);setPvalue('July - September(2019)');setDrp(!drp)}}>July - September(2019)</p>
                <p onClick={e=>{call_period(`'2019-10-01' and '2019-12-31'`,'October - December(2019)');setMsg(`October (01/10/2019) to December (30/12/2019)`);setPvalue('October - December(2019)');setDrp(!drp)}}>October - December(2019)</p>
                <p onClick={e=>{call_period(`'2020-01-01' and '2020-03-31'`,'January - March(2020)');setMsg(`January (01/01/2020) to March (31/03/2020)`);setPvalue('January - March(2020)');setDrp(!drp)}}>January - March(2020)</p>
                <p onClick={e=>{call_period(`'2020-04-01' and '2020-06-30'`,'April - June(2020)');setMsg(`April (01/04/2020) to June (30/06/2020)`);setPvalue('April - June(2020)');setDrp(!drp)}}>April - June(2020)</p>

                <p onClick={e=>{call_period(`'2020-07-01' and '2020-09-30'`,'July - September(2020)');setMsg(`July (01/07/2020) to September (30/09/2020)`);setPvalue('July - September(2020)');setDrp(!drp)}}>July - September(2020)</p>
                <p onClick={e=>{call_period(`'2020-10-01' and '2020-12-31'`,'October - December(2020)');setMsg(`October (01/10/2020) to December (30/12/2020)`);setPvalue('October - December(2020)');setDrp(!drp)}}>October - December(2020)</p>
                <p onClick={e=>{call_period(`'2021-01-01' and '2021-03-31'`,'January - March(2021)');setMsg(`January (01/01/2021) to March (31/03/2021)`);setPvalue('January - March(2021)');setDrp(!drp)}}>January - March(2021)</p>
                <p onClick={e=>{call_period(`'2021-04-01' and '2021-06-30'`,'April - June(2021)');setMsg(`April (01/04/2021) to June (30/06/2021)`);setPvalue('April - June(2021)');setDrp(!drp)}}>April - June(2021)</p>

                <p onClick={e=>{call_period(`'2021-07-01' and '2021-09-30'`,'July - September(2021)');setMsg(`July (01/07/2021) to September (30/09/2021)`);setPvalue('July - September(2021)');setDrp(!drp)}}>July - September(2021)</p>
                <p onClick={e=>{call_period(`'2021-10-01' and '2021-12-31'`,'October - December(2021)');setMsg(`October (01/10/2021) to December (30/12/2021)`);setPvalue('October - December(2021)');setDrp(!drp)}}>October - December(2021)</p>
                <p onClick={e=>{call_period(`'2022-01-01' and '2022-03-31'`,'January - March(2022)');setMsg(`January (01/01/2022) to March (31/03/2022)`);setPvalue('January - March(2022)');setDrp(!drp)}}>January - March(2022)</p>
                <p onClick={e=>{call_period(`'2022-04-01' and '2022-06-30'`,'April - June(2022)');setMsg(`April (01/04/2022) to June (30/06/2022)`);setPvalue('April - June(2022)');setDrp(!drp)}}>April - June(2022)</p>
                </div>
            </div><br />

            <div className="tables">
                <div style={{display: 'flex',justifyContent: 'space-between',margin: '0 0 15px'}}>
                    <p style={{cursor:'pointer',color: '#0093E9'}} className="expall" onClick={e=>export_all()}><FaFileWord />Export All</p>
                        
                    <Link to="/super_admin" style={{color: "#ff7295", display:'flex',alignItems:'center'}}><IoMdArrowRoundBack />Back</Link>
                </div>
                <h3>FACULTY DETAILS</h3>
                
                {/*Financial Support*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'department',title:'Department',filterPlaceholder:'Filter by Department'},
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'f',title:'Name of the professional body for which membership fee is provided',filterPlaceholder:'Filter by Name of the professional body for which membership fee is provided'},
                            {field:'amount_support',title:'Amount Support',filterPlaceholder:'Filter by Amount Support'},
                            {field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={rps} title={`Financial Support ( Total - ${rps ? rps.length : '0'} )`} />                        
                    }    
                </div>
            </div>    
        </div>
    )
}

export default Financials