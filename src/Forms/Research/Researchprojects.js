import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'
import Axios from 'axios'

function Researchprojects(){
    const [uData,setUdata] = useState()
    const [men,setMen] = useState(false)
    const [img,setimg] = useState()
    const [csvArray, setCsvArray] = useState([]);
    const [csv,setCsv] = useState()
    const editprofile = `/dashboard/editprofile/${uData ? uData._id : ''}`
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
            setUdata(datas.user)

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
                            title: '',
                            no: '',
                            image: '',
                            amount_sanctioned: '',
                            fileno: '',
                            amount_received: '',
                            date_sanctioned: '',
                            funding_agency: '',
                            date: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({
                                title: Yup.string()
                                    .required('Required'),
                                no: Yup.string()
                                    .oneOf(
                                    ['Newly Sanctioned','Ongoing'],
                                    'Invalid'
                                    ),
                                // amount_sanctioned: Yup.string(),
                                // fileno: Yup.string(),
                                // amount_received: Yup.string(),
                                // date_sanctioned: Yup.string(),
                                // funding_agency: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {    
                                console.log(uData[0].name)
                                console.log(img)
                                let dat = new FormData()
                                dat.append('image',img)
                                dat.append('user_id',uData[0].user_id)
                                dat.append('n',uData[0].name)
                                dat.append('title',values.title)
                                dat.append('no',values.no)
                                dat.append('amount_sanctioned',values.amount_sanctioned)
                                dat.append('fileno',values.fileno)
                                dat.append('amount_received',values.amount_received)
                                dat.append('date_sanctioned',values.date_sanctioned)
                                dat.append('funding_agency',values.funding_agency)
                                dat.append('date',values.date)

                                Axios.post('http://localhost:3000/forms/research/research_projects',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    alert("Data Updated"),
                                    history.push("/dashboard"))
                                .catch(err => console.log(err))
                            },600)
                        }}

                        // onSubmit={(values, { setSubmitting,resetForm }) => {
                        //     setTimeout(async () => {    
                        //         console.log(uData[0].name)
                        //         const res = await fetch(`/forms/research/research_projects`,{
                        //             method: "POST",
                        //             headers: {
                        //                 'Content-Type': 'application/json'
                        //             },
                        //             body: JSON.stringify({
                        //                 user_id : `${uData[0].user_id}`,
                        //                 n : uData[0].name,
                        //                 title: values.title,
                        //                 no: values.no,
                        //                 amount_sanctioned: values.amount_sanctioned,
                        //                 fileno: values.fileno,
                        //                 amount_received: values.amount_received,
                        //                 date_sanctioned: values.date_sanctioned,
                        //                 funding_agency: values.funding_agency,
                        //                 date: values.date
                        //             })
                        //         })
    
                        //         const data = await res.json()
                        //         console.log(data)
                        //         if(res.status === 422 || !data){
                        //             window.alert(`${data.error}`)
                        //         }
                        //         else{
                        //             setSubmitting(false);
                        //             resetForm()
                        //             alert("Data Updated")
                        //             history.push("/dashboard")
                        //         }
                        //     }, 600);
                        // }}
                    >
                        <Form method="POST" encType='multipart/form-data' className="form">
                            <h3>Research Projects</h3>
                            
                            <TextInput
                                id="tite"
                                name="title"
                                type="text"
                                label="Title of the project"
                            />

                            <input type="file" name='image' onChange={e=>setimg(e.target.files[0])}/>
    
                            <MySelect name="no" label="Newly Sanctioned / Ongoing">
                                <option value="">--Newly Sanctioned / Ongoing--</option>
                                <option value="Newly Sanctioned">Newly Sanctioned</option>
                                <option value="Ongoing">Ongoing</option>
                            </MySelect>
    
                            <TextInput
                                id="amount_sanctioned"
                                name="amount_sanctioned"
                                type="text"
                                label="Sanctioned Amount (Rs.)"
                            />
    
                            <TextInput
                                id="fileno"
                                name="fileno"
                                type="text"
                                label="File No./Grant No."
                            />
    
                            <TextInput
                                id="amount_received"
                                name="amount_received"
                                type="text"
                                label="Amount Received"
                            />      
    
                            <TextInput
                                id="date_sanctioned"
                                name="date_sanctioned"
                                type="date"
                                label="Date of Sanction"
                            />     
    
                            <TextInput
                                id="funding_agency"
                                name="funding_agency"
                                type="text"
                                label="Funding Agency"
                            />

                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                label="Date of Happen"
                            />

                            <div className="btn">
                                {/* <button type="reset">Reset</button> */}
                                <button type="submit">Save</button>
                            </div>
                        </Form>
                    </Formik>
                </div>

                {/* <div className="fo" style={{marginTop: "20px"}}>
                    <Formik
                        initialValues = {{
                            email: `${uData ? uData.email : ''}`,
                            csvs: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({
                                
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {    
                                const res = await fetch(`/forms/research/research_projects`,{
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
                        <Form method="POST" className="form" >
                            <h3>Research Projects</h3>
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
                                                        obj[headers[j].replace(/['"]+/g, '')] = currentline[j];
                                                        if(j==headers.length-1){
                                                            obj[headers[j].replace(/['"]+/g, '')] = currentline[j];
                                                        }
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
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Researchprojects