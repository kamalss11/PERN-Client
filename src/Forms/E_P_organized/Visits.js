import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'

function Visits(){
    const [uData,setUdata] = useState()
    const [men,setMen] = useState(false)
    const [csv,setCsv] = useState()
    const [csvArray,setCsvArray] = useState([])
    const editprofile = `/dashboard/editprofile/${uData ? uData[0].user_id : ''}`
    console.log(uData)
    const history = useHistory()

    const callAboutPage = async () => {
        try{
            const res = await fetch('/dashboard',{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const datas = await res.json()
            setUdata(datas)

            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }
        }catch(err){
            console.log(err)
            history.push('/signin')
        }
    }

    useEffect(() => {
        callAboutPage()
    },[])

    const TextInput = ({ label,...props }) => {
        const [field,meta] = useField(props)
        return(
            <div className="fields">
                <label htmlFor={props.id || props.name}>{label}</label>
                <input {...field} {...props}></input>
                {
                    meta.touched && meta.error ?(
                        <p className="error">{meta.error}</p>
                    ):null
                }
            </div>
        )
    }
    return(
        <>
            <Sidebar />
            <div className="about">
                <div className="content">
                    <div className="hdr">
                        <h3>Dashboard</h3>
                        <b onClick={()=>setMen(!men)}>
                            <p> <span>Hello,</span> {uData ? uData[0].name : ''}</p>
                            <ul className={men ? "men active" : "men"}>
                                <li><Link to="/dashboard/profile"><CgProfile />Profile</Link></li>
                                <li><Link to={editprofile}><RiLockPasswordLine />Change password</Link></li>
                                <li><Link to="/logout"><AiOutlineLogout />Logout</Link></li>
                            </ul>
                        </b>
                    </div>

                    <div className="fo">
                    <Formik
                        initialValues = {{
                            classes: '',
                            date: '',
                            address: '',
                            total: '',
                            outcome: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({   
                                classes: Yup.string()
                                    .required('Required'), 
                                address: Yup.string(),
                                total: Yup.string(),
                                outcome: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                const res = await fetch(`/forms/events/industrial_visits`,{
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        user_id : uData[0].user_id,
                                        classes: values.classes,
                                        date: values.date,
                                        address: values.address,
                                        total: values.total,
                                        outcome: values.outcome
                                    })
                                })
    
                                const data = await res.json()
                                console.log(data)
                                if(res.status === 422 || !data){
                                    window.alert(`${data.error}`)
                                }
                                else{
                                    setSubmitting(false);
                                    resetForm()
                                    alert("Data Saved")
                                    history.push("/dashboard")
                                }
                            }, 400);
                        }}
                    >
                        <Form method="POST" className="form">
                            <h3>Industrial Visits</h3>

                            <TextInput
                                id="classes"
                                name="classes"
                                type="text"
                                label="Class"
                            />

                            <TextInput
                                id="address"
                                name="address"
                                type="text"
                                label="Industry visited with Address"
                            />

                            <TextInput
                                id="total"
                                name="total"
                                type="text"
                                label="Total no. of Beneficiaries"
                            />

                            <TextInput
                                id="outcome"
                                name="outcome"
                                type="text"
                                label="Programme Outcome"
                            />

                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                label="Date of Happen"
                            />

                            <div className="btn">
                                <button type="submit">Save</button>
                            </div>
                        </Form>
                    </Formik>
                    </div>

                    <div className="fo" style={{marginTop: "0"}}>
                    <Formik
                        initialValues = {{
                            email: `${uData ? uData.email : ''}`,
                            csvs: ''
                        }}

                        enableReinitialize       

                        // validationSchema = {
                        //     Yup.object().shape({
                        //         csvs:  Yup.mixed().required('A file is required')
                        //     })
                        // }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {    
                                const res = await fetch(`/forms/research/patents`,{
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        email : `${uData.email}`,
                                        filled: `${uData.filled + 1}`,
                                        csvs: csvArray
                                    })
                                })
    
                                const data = await res.json()
                                console.log(data)
                                if(res.status === 422 || !data){
                                    window.alert(`${data.error}`)
                                }
                                else{
                                    setSubmitting(false);
                                    resetForm()
                                    alert("Profile Updated")
                                    history.push("/dashboard")
                                }
                            }, 1000);
                        }}
                    >
                        <Form method="POST" className="form">
                            <h3>Conference / Seminar / Symposium / Workshop organized</h3>
                            <p><b>You can upload more than one form at a time<br />
                                Accepts only CSV format
                            </b></p>

                            
                            <div className="fields">
                                <label>Upload file as <b>CSV</b></label>
                                <input
                                    id="csvs"
                                    name="csvs"
                                    type="file"
                                    accept=".csv"
                                    required
                                    onChange={e=>{setCsv(e.target.files[0]);console.log(e.target.files[0]);
                                        if(e.target.files[0]){
                                            console.log(csv)
                                            const file = e.target.files[0]
                                            const reader = new FileReader()
                                            reader.onload = async function(e){
                                                let allText = e.target.result
                                                console.log(allText)
                                                let lines = [];
                                                const linesArray = allText.split('\n');
                                                console.log(linesArray)
                                                linesArray.forEach((e,i) => {
                                                    const row = e.replace(/['"]+/g, '');
                                                    console.log(row)
                                                    lines.push(row);
                                                });
                                                // for removing empty record
                                                lines.splice(lines.length - 1);
                                                const result = [];
                                                const headers = lines[0].split(",");
        
                                                for (let i = 1; i < lines.length; i++) {
        
                                                    const obj = {};
                                                    const currentline = lines[i].split(",");
        
                                                    for (let j = 0; j < headers.length; j++) {
                                                        obj[headers[j]] = currentline[j];
                                                    }
                                                    result.push(obj);
                                                }
                                                //return result; //JavaScript object
                                                // return JSON.stringify(result); //JSON
                                                var check = result
                                                setCsvArray(result)
                                                console.log(check)
                                                result.map((e)=>{
                                                    console.log(e)
                                                })                               
                                            }
                                            reader.readAsText(file)
                                        }}}
                                />   
                            </div>

                            <div className="btn">
                                <button type="submit">Save</button>
                            </div>
                        </Form>
                    </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Visits