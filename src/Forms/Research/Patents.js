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

function Patent(){
    const [uData,setUdata] = useState()
    const [men,setMen] = useState(false)
    const [img,setimg] = useState()
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
                        <h4 className='h'>Research</h4>
                    </div>

                    <div className="fo">
                    <Formik
                        initialValues = {{
                            title: '',
                            field: '',
                            fileno: '',
                            date_awarded_patent: '',
                            royalty_received: '',
                            providing_agency: '',
                            country: '',
                            date : '',
                            image : '',
                            n:''
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
                                dat.append('title',values.title)
                                dat.append('field',values.field)
                                dat.append('fileno',values.fileno)
                                dat.append('date_awarded_patent',values.date_awarded_patent)
                                dat.append('royalty_received',values.royalty_received)
                                dat.append('providing_agency',values.providing_agency)
                                dat.append('date',values.date)
                                dat.append('country',values.country)
                                dat.append('department',uData[0].department)

                                Axios.post('http://localhost:3000/forms/research/patents',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    toast.success("Data Inserted",{autoClose:1000}),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 400);
                        }}
                    >
                        <Form method="POST" className="form">
                            <h3>Patents</h3>

                            <TextInput
                                id="n"
                                name="n"
                                type="text"
                                label="Name of the faculty"
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
                                type="date"
                                label="Date of awarded of patent"
                            />         

                            <TextInput
                                id="royalty_received"
                                name="royalty_received"
                                type="number"
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
                                {
                                    save ? 
                                    <button style={{pointerEvents: 'none'}}>Save <i class="fa fa-spinner fa-spin"></i></button> : 
                                    <button onClick={e=>Setsave(!save)} type="submit">Save <IoSave/></button> 
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

export default Patent