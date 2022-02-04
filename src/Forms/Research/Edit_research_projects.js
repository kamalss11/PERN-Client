import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory,useLocation} from 'react-router-dom'
import * as Yup from 'yup'
import {CgMenuRight} from 'react-icons/cg'
import {FaUserCircle} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'
import Axios from 'axios'

function Edit_research_projects(props){
    const location = useLocation()
    const history = useHistory()
    const [uData,setUdata] = useState()
    const [rp,setRp] = useState()
    const [men,setMen] = useState(false)
    const [img,setimg] = useState()
    const editprofile = `/dashboard/editprofile`
    console.log(uData)
    const [sb,setSb] = useState(false)

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

            if(!location.state){
                history.push('/dashboard/view_staffs')
            }
            else{
                const rps = await fetch(`/forms/research_projects/edit/${location.state.id}`,{
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
    
                const r = await rps.json()
                console.log(r)
                setRp(r)
            }
        }catch(err){
            console.log(err)
            history.push('/signin')
        }
    }

    useEffect(() => {
        callAboutPage()
        // console.log(location.state.id)
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
                        <h4 className='h'>Research</h4>
                    </div>

                    <div className="fo">

                    <Formik
                        initialValues = {{
                            n: `${rp ? rp[0].n :  ''}`,
                            image: `${rp ? rp[0].file :  ''}`,
                            title: `${rp ? rp[0].title : ''}`,
                            no: `${rp ? rp[0].no : ''}`,
                            amount_sanctioned: `${rp ? rp[0].amount_sanctioned : ''}`,
                            fileno: `${rp ? rp[0].fileno : ''}`,
                            amount_received: `${rp ? rp[0].amount_received : ''}`,
                            date_sanctioned: `${rp ? rp[0].date_sanctioned : ''}`,
                            funding_agency: `${rp ? rp[0].funding_agency : ''}`,
                            date: `${rp ? rp[0].date: ''}`
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
                                amount_sanctioned: Yup.string(),
                                fileno: Yup.string(),
                                amount_received: Yup.string(),
                                date_sanctioned: Yup.string(),
                                funding_agency: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {    
                                console.log(uData[0].name)
                                console.log(img)
                                let dat = new FormData()
                                dat.append('image',img)
                                dat.append('id',rp[0].id)
                                dat.append('n',values.n)
                                dat.append('title',values.title)
                                dat.append('no',values.no)
                                dat.append('amount_sanctioned',values.amount_sanctioned)
                                dat.append('fileno',values.fileno)
                                dat.append('amount_received',values.amount_received)
                                dat.append('date_sanctioned',values.date_sanctioned)
                                dat.append('funding_agency',values.funding_agency)
                                dat.append('date',values.date)

                                Axios.put('http://localhost:3000/forms/research/research_projects/edit',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    alert("Data Updated"),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            },600)
                        }}
                    >
                        <Form method="PUT" className="form">
                            <h3>Edit Research Projects</h3>

                            <TextInput
                                id="n"
                                name="n"
                                type="text"
                                label="Name of the Faculty"
                                // placeholder="Title of the project"
                            />

                            <TextInput
                                id="title"
                                name="title"
                                type="text"
                                label="Title of the project"
                                // placeholder="Title of the project"
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
                                // placeholder="Sanctioned Amount (Rs.)"
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

                            <div className='fields'>
                                <label htmlFor='file'>Upload New File or it will replace with old file</label>

                                <input type="file" id='file' name='image' onChange={e=>setimg(e.target.files[0])}/>       
                            </div>   

                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                label="Date Happened"
                            />
                              

                            <div className="btn">
                                <button type="submit">Update</button>
                            </div>
                        </Form>
                    </Formik>
                </div>

                </div>
            </div>
        </>
    )
}

export default Edit_research_projects