import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgMenuRight} from 'react-icons/cg'
import {FaUserCircle} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'
import Axios from 'axios'
import {IoSave} from 'react-icons/io5'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
toast.configure()

function Evs(){
    const [img,setimg] = useState()
    const [uData,setUdata] = useState()
    const [men,setMen] = useState(false)
    const editprofile = `/dashboard/editprofile`
    console.log(uData)
    const history = useHistory()
    const [sb,setSb] = useState(false)
    const [save,Setsave] = useState(false)

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
    return(
        <>
        <Sidebar sb={sb} set={setSb} />
        <div className={`about ${sb ? 'activate' : ''}`}>
        <div className="content">
            <div className={`hdr ${sb ? 'activate' : ''}`}>
                    <div className="beg">
                        <CgMenuRight onClick={e=>setSb(!sb)} />
                        <h4>Dashboard</h4>
                    </div>

                    <b onClick={()=>setMen(!men)}>
                        <p> <span>Hello,</span> {uData ? uData[0].name : ''}</p>
                        <ul className={men ? "men active" : "men"}>
                            <li><Link to="/dashboard/profile"><FaUserCircle />Profile</Link></li>
                            <li><Link to={editprofile}><RiLockPasswordLine />Change password</Link></li>
                            <li><Link to="/logout"><AiOutlineLogout />Logout</Link></li>
                        </ul>
                    </b>
            </div>
                    
                    <div className='dprt'>
                        <h4>Internal Quality Assurance Cell (IQAC)</h4>
                        <h4>Department : {uData ? uData[0].department : null } - Staffs</h4>
                        <h4 className='h'>Events / Programmes Organized</h4>
                    </div>

                    <div className="fo">
                    <Formik
                        initialValues = {{
                            date: '',
                            place: '',
                            total: '',
                            activity: '',
                            image: '',
                            n: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({   
                                date: Yup.date()
                                    .required('Required'),   
                                place: Yup.string()
                                    .required('Required'),               
                                total: Yup.string(),
                                activity: Yup.string()
                            })
                        }
                        
                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                let dat = new FormData()
                                console.log(img)
                                dat.append('image',img)
                                dat.append('n',values.n)
                                dat.append('date',values.date)
                                dat.append('place',values.place)
                                dat.append('total',values.total)
                                dat.append('activity',values.activity)
                                dat.append('department',uData[0].department)

                                Axios.post('http://localhost:3000/forms/events/evs',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    toast.success("Data Inserted",{autoClose:1000}),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 400);
                        }}
                    >
                        <Form method="POST" className="form">
                            <h3>Environmental Science (EVS) Visit</h3>

                            <TextInput
                                id="n"
                                name="n"
                                type="text"
                                label="Name of the faculty"
                            />

                            <TextInput
                                id="place"
                                name="place"
                                type="text"
                                label="Place of Visit with Address"
                            />

                            <TextInput
                                id="total"
                                name="total"
                                type="text"
                                label="Total no. of Students"
                            />

                            <TextInput
                                id="activity"
                                name="activity"
                                type="text"
                                label="Nature of Activity"
                            />

                            <div className='fields'>
                                <label htmlFor='file'>Upload File</label>

                                <input type="file" id='file' name='image' onChange={e=>setimg(e.target.files[0])}/>       
                            </div>

                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                label="Date of Happen"
                            />

                            <div className="btn">
                                {/* <button type="reset">Reset</button> */}
                                {
                                    save ? 
                                    <button style={{pointerEvents: 'none'}}>Save <i class="fa fa-spinner fa-spin"></i></button> : 
                                    <button onClick={e=>Setsave(!save)} type="submit">Save <IoSave/></button> 
                                }
                            </div>
                        </Form>
                    </Formik>
                    </div>

                    {/* <div className="fo" style={{marginTop: "0"}}>
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
                            <h3>Environmental Science (EVS) Visit</h3>
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
                    </div> */}

                </div>
            </div>
        </>
    )
}

export default Evs