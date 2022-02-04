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

function Edit_financial(){
    const location = useLocation()
    const [img,setimg] = useState()
    const [uData,setUdata] = useState()
    const [fin,setFin] = useState()
    const [men,setMen] = useState(false)
    const editprofile = `/dashboard/editprofile`
    console.log(uData)
    const [sb,setSb] = useState(false)
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

            if(!location.state){
                history.push('/dashboard/view_staffs')
            }
            else{
                const rps = await fetch(`/forms/financial_support/edit/${location.state.id}`,{
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
    
                const r = await rps.json()
                console.log(r)
                setFin(r)
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
                        <h4 className='h'>Faculties</h4>
                    </div>

                    <div className="fo">
                    <Formik
                        initialValues = {{
                            n: `${fin ? fin[0].n : ''}`,
                            f: `${fin ? fin[0].f : ''}`,
                            amount_support: `${fin ? fin[0].amount_support : ''}`,
                            date: `${fin ? fin[0].date : ''}`,
                            image: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({     
                                f: Yup.string()
                                    .required('Required'),  
                                amount_support: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                let dat = new FormData()
                                console.log(img,values.date)
                                dat.append('image',img)
                                dat.append('id',fin[0].id)
                                dat.append('n',values.n)
                                dat.append('f',values.f)
                                dat.append('amount_support',values.amount_support)
                                dat.append('date',values.date)

                                Axios.put('http://localhost:3000/forms/faculty/financial_support/edit',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    alert("Data Updated"),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 400);
                        }}
                    >
                        <Form method="PUT" className="form">
                            <h3>Edit Financial Support </h3>
                            
                            <TextInput
                                id="n"
                                name="n"
                                type="text"
                                label="Name of the Faculty"
                                // placeholder="Title of the project"
                            />
                            
                            <TextInput
                                id="f"
                                name="f"
                                type="text"
                                label="Professional body for membership fee is provided"
                            />

                            <TextInput
                                id="amount_support"
                                name="amount_support"
                                type="number"
                                label="Amount of support "
                            />

                            <div className='fields'>
                                <label htmlFor='file'>Upload New File or it will replace with old file</label>

                                <input type="file" id='file' name='image' onChange={e=>setimg(e.target.files[0])}/>       
                            </div> 

                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                label="Date of Happen"
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

export default Edit_financial