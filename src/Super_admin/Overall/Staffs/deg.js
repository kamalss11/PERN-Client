import React,{useEffect, useState} from 'react'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import { Link,useHistory } from 'react-router-dom'
import '../../../CSS/LS.css'
import MaterialTable from 'material-table'
import {FaFileWord} from 'react-icons/fa'
import { RiAdminFill } from 'react-icons/ri'

function Deg(){
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
    const [msg,setMsg] = useState('All')
    console.log(data)   

    const call_period = async (prd) => {
        try{
            const res = await fetch(`/period/overall/staffs/${prd}/degree`,{
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
                const ad = await fetch(`/super_admin/overall/staffs/degree`,{
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

    const MySelect = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <div className="fields">
                <label htmlFor={props.id || props.name}>{label}</label>
                <select {...field} {...props} />
                {
                    meta.touched && meta.error ?(
                        <p className="error">{meta.error}</p>
                    ):null
                }
            </div>
        )
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
                    <h2>Overall Ph.D/M.Phil - Staffs Reports</h2>
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
                <h2>RESEARCH </h2>
                <h4>1.4 Ph. D/M. Phil</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Department</th>
                    <th>Name of the Scholar</th>
                    <th>Ph. D/M. Phil</th>
                    <th>Guide’s Name</th>
                    <th>Title of the Thesis</th>
                    <th>External Examiner’s Name, Designation and Address</th>
                    <th>Date</th>
                    <th>Venue of Viva</th>
                </tr>
                {
                    rps ? rps.map((r,i)=>{
                        const {n,department,deg,guide_name,title,external,venue,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{department ? department : '-'}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{deg? deg : '-'}</td>
                                <td>{guide_name ? guide_name : '-'}</td>
                                <td>{title? title : '-'}</td>
                                <td>{external ? external : '-'}</td>
                                <td>{date? date : '-'}</td>
                                <td>{venue? venue : '-'}</td>
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
                <p>Overall Ph.D/M.Phil - Staffs Report</p>
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

            <Formik
                initialValues={{
                    period : ''
                }}

                enableReinitialize

                validationSchema={
                    Yup.object({
                        period: Yup.string().required('Required')
                    })
                }
            >
                <Form style={{display: 'block',textAlign:'center',margin:'20px 0',background:'none'}}>
                    <div>
                        <label style={{fontSize:'14px',fontWeight:'bold'}}>Filter by Period</label><br />
                        <select style={{margin:'15px 0',}} onChange={async (e)=>{if(e.target.value === 'All'){
                            setMsg('All')
                        }
                        else if(e.target.value === `'2019-07-01' and '2019-09-30'`){
                            setMsg(`July (01/07/2019) to September (30/09/2019)`)
                        }
                        else if(e.target.value === `'2019-10-01' and '2019-12-31'`){
                            setMsg(`October (01/10/2019) to December (30/12/2019)`)
                        }
                        else if(e.target.value === `'2020-01-01' and '2020-03-31'`){
                            setMsg(`January (01/01/2020) to March (31/03/2020)`)
                        }
                        else if(e.target.value === `'2020-04-01' and '2020-06-30'`){
                            setMsg(`April (01/04/2020) to June (30/06/2020)`)
                        }

                        else if(e.target.value === `'2020-07-01' and '2020-09-30'`){
                            setMsg(`July (01/07/2020) to September (30/09/2020)`)
                        }
                        else if(e.target.value === `'2020-10-01' and '2020-12-31'`){
                            setMsg(`October (01/10/2020) to December (30/12/2020)`)
                        }
                        else if(e.target.value === `'2021-01-01' and '2021-03-31'`){
                            setMsg(`January (01/01/2021) to March (31/03/2021)`)
                        }
                        else if(e.target.value === `'2021-04-01' and '2021-06-30'`){
                            setMsg(`April (01/04/2021) to June (30/06/2021)`)
                        }

                        else if(e.target.value === `'2021-07-01' and '2021-09-30'`){
                            setMsg(`July (01/07/2021) to September (30/09/2021)`)
                        }
                        else if(e.target.value === `'2021-10-01' and '2021-12-31'`){
                            setMsg(`October (01/10/2021) to December (30/12/2021)`)
                        }
                        else if(e.target.value === `'2022-01-01' and '2022-03-31'`){
                            setMsg(`January (01/01/2022) to March (31/03/2022)`)
                        }
                        else if(e.target.value === `'2022-04-01' and '2022-06-30'`){
                            setMsg(`April (01/04/2022) to June (30/06/2022)`)
                        }

                        if(e.target.value === 'All'){
                            await callAboutPage()
                            setMsg('All')
                        }
                        else{
                            await call_period(e.target.value)
                        }
                        
                        }} name="period" label="Filter By Period">
                            <option selected value='All'>All</option>
                            <option value={`'2019-07-01' and '2019-09-30'`}>July - September(2019)</option>
                            <option value={`'2019-10-01' and '2019-12-31'`}>October - December(2019)</option>
                            <option value={`'2020-01-01' and '2020-03-31'`}>January - March(2020)</option>
                            <option value={`'2020-04-01' and '2020-06-30'`}>April - June(2020)</option>

                            <option value={`'2020-07-01' and '2020-09-30'`}>July - September(2020)</option>
                            <option value={`'2020-10-01' and '2020-12-31'`}>October - December(2020)</option>
                            <option value={`'2021-01-01' and '2021-03-31'`}>January - March(2021)</option>
                            <option value={`'2021-04-01' and '2021-06-30'`}>April - June(2021)</option>

                            <option value={`'2021-07-01' and '2021-09-30'`}>July - September(2021)</option>
                            <option value={`'2021-10-01' and '2021-12-31'`}>October - December(2021)</option>
                            <option value={`'2022-01-01' and '2022-03-31'`}>January - March(2022)</option>
                            <option value={`'2022-04-01' and '2022-06-30'`}>April - June(2022)</option>
                        </select><br />
                    </div>
                </Form>
            </Formik>

            <div className="tables">
                <div style={{display: 'flex',justifyContent: 'space-between',margin: '0 0 15px'}}>
                    <p style={{cursor:'pointer'}} className="expall" onClick={e=>export_all()}><FaFileWord />Export All</p>
                    
                    <Link to="/super_admin" style={{color: "red"}}>Back</Link>
                </div>
                <h3>Research</h3>
                
                {/* M.Phil/P.hd */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},exportFileName:'Ct',rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'department',title:'Department',filterPlaceholder:'Filter by Department'},
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'deg',title:'Degree',filterPlaceholder:'Filter by Degree'},
                            {field:'title',title:'Title of Thesis',filterPlaceholder:'Filter by Title of thesis'},
                            {field:'external',title:'External',filterPlaceholder:'Filter by External'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={rps} title="Ph.D/M.Phil"  />
                        
                    }    
                </div>       
            </div>    
        </div>
    )
}

export default Deg