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
                            date: '',
                            n: ''
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
                                let dat = new FormData()
                                dat.append('image',img)
                                dat.append('n',values.n)
                                dat.append('title',values.title)
                                dat.append('no',values.no)
                                dat.append('amount_sanctioned',values.amount_sanctioned)
                                dat.append('fileno',values.fileno)
                                dat.append('amount_received',values.amount_received)
                                dat.append('date_sanctioned',values.date_sanctioned)
                                dat.append('funding_agency',values.funding_agency)
                                dat.append('date',values.date)
                                dat.append('department',uData[0].department)

                                Axios.post('http://localhost:3000/forms/research/research_projects',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    alert("Data Inserted"),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            },600)
                        }}
                    >
                        <Form method="POST" encType='multipart/form-data' className="form">
                            <h3>Research Projects</h3>                            

                            <TextInput
                                id="n"
                                name="n"
                                type="text"
                                label="Name of the faculty"
                            />
                            
                            <TextInput
                                id="tite"
                                name="title"
                                type="text"
                                label="Title of the project"
                            />
    
                            <MySelect name="no" label="Newly Sanctioned / Ongoing">
                                <option value="">--Newly Sanctioned / Ongoing--</option>
                                <option value="Newly Sanctioned">Newly Sanctioned</option>
                                <option value="Ongoing">Ongoing</option>
                            </MySelect>
    
                            <TextInput
                                id="amount_sanctioned"
                                name="amount_sanctioned"
                                type="number"
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
                                type="number"
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

                            <div className='fields'>
                                <label htmlFor='file'>Upload File</label>

                                <input type="file" id='file' name='image' onChange={e=>setimg(e.target.files[0])}/>       
                            </div>

                            <div className="btn">
                                {/* <button type="reset">Reset</button> */}
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

export default Researchprojects