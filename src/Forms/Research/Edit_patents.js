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
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
toast.configure()

function Edit_patents(){
    const location = useLocation()
    const [uData,setUdata] = useState()
    const [img,setimg] = useState()
    const [pat,setpat] = useState()
    const [men,setMen] = useState(false)
    const editprofile = `/dashboard/editprofile`
    console.log(uData)
    const [sb,setSb] = useState(false)
    const history = useHistory()
    const [up,Setup] = useState(false)

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

            if(!location.state){
                history.push('/dashboard/view_staffs')
            }
            else{
                const rps = await fetch(`/forms/patents/edit/${location.state.id}`,{
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
    
                const r = await rps.json()
                console.log(r)
                setpat(r)
            }

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
                        <h4 className='h'>Research</h4>
                    </div>
                    
                    <div className="fo">
                    <Formik
                        initialValues = {{
                            n: `${pat ? pat[0].n : ''}`,
                            title: `${pat ? pat[0].title : ''}`,
                            field: `${pat ? pat[0].field : ''}`,
                            fileno: `${pat ? pat[0].fileno : ''}`,
                            date_awarded_patent: `${pat ? pat[0].date_awarded_patent : ''}`,
                            royalty_received: `${pat ? pat[0].royalty_received : ''}`,
                            providing_agency: `${pat ? pat[0].providing_agency : ''}`,
                            country: `${pat ? pat[0].country : ''}`,
                            date: `${pat ? pat[0].date: ''}`
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({
                                title: Yup.string()
                                    .required('Required'),
                                field: Yup.string(),                                       
                                fileno: Yup.string(),
                                date_awarded_patent: Yup.date(),
                                royalty_received: Yup.string(),
                                providing_agency: Yup.string(),
                                country: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                let dat = new FormData()
                                dat.append('image',img)
                                dat.append('n',values.n)
                                dat.append('id',pat[0].id)
                                dat.append('title',values.title)
                                dat.append('field',values.field)
                                dat.append('fileno',values.fileno)
                                dat.append('date_awarded_patent',values.date_awarded_patent)
                                dat.append('royalty_received',values.royalty_received)
                                dat.append('providing_agency',values.providing_agency)
                                dat.append('date',values.date)
                                dat.append('country',values.country)

                                Axios.put('http://localhost:3000/forms/research/patents/edit',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    toast.success("Data Updated",{autoClose: 1000}),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 600);
                        }}
                    >
                        <Form method="PUT" className="form">
                            <h3>Edit Patents</h3>
                            
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
                                label="Title of the Patent"
                            />

                            <TextInput
                                id="field"
                                name="field"
                                type="text"
                                label="Patent Field"
                            />

                            <TextInput
                                id="fileno"
                                name="fileno"
                                type="text"
                                label="Patent No. / File No."
                            />

                            <TextInput
                                id="date_awarded_patent"
                                name="date_awarded_patent"
                                type="text"
                                label="Date of awarded of patent"
                            />         

                            <TextInput
                                id="royalty_received"
                                name="royalty_received"
                                type="text"
                                label="Royalty Received (in Rs.)"
                            />      

                            <TextInput
                                id="providing_agency"
                                name="providing_agency"
                                type="text"
                                label="Providing Agency"
                            />  

                            <TextInput
                                id="country"
                                name="country"
                                type="text"
                                label="India / Abroad (specify country)"
                            /> 

                            <div className='fields'>
                                <label for='file'>Upload New File or it will replace with old file</label>

                                <input type="file" id='file' name='image' onChange={e=>setimg(e.target.files[0])}/>       
                            </div>

                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                label="Date Happened"
                            />                                   

                            <div className="btn">
                                {
                                    up ? 
                                    <button style={{pointerEvents: 'none'}}>Update <i class="fa fa-spinner fa-spin"></i></button> : 
                                    <button onClick={e=>Setup(!up)} type="submit">Update <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></button>
                                }
                            </div>
                        </Form>
                    </Formik>
                </div>
                </div>
            </div>
        </>
    )
}

export default Edit_patents