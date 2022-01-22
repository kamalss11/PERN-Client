import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'
import Axios from 'axios'

function Edit_visits(){
    const [img,setimg] = useState()
    const [uData,setUdata] = useState()
    const [vis,setVis] = useState()
    const [men,setMen] = useState(false)
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
            setUdata(datas.user)

            const d = await fetch(`/forms/events/industrial_visits/edit/${window.localStorage.getItem('edit')}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const de = await d.json()
            setVis(de)

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
                    
                    <div className='dprt'>
                        <h4>Internal Quality Assurance Cell (IQAC)</h4>
                        <h4>Department : {uData ? uData[0].department : null } - Staffs</h4>
                        <h4 className='h'>Events / Programmes Organized</h4>
                    </div>

                    <div className="fo">
                    <Formik
                        initialValues = {{
                            classes: `${vis ? vis[0].classes : ''}`,
                            date: `${vis ? vis[0].date : ''}`,
                            address: `${vis ? vis[0].address : ''}`,
                            total: `${vis ? vis[0].total : ''}`,
                            outcome: `${vis ? vis[0].outcome : ''}`,
                            image: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({   
                                classes: Yup.string()
                                    .required('Required'),
                                address: Yup.string(),
                                total: Yup.string(),
                                outcome: Yup.string(), 
                                date: Yup.date().required('Required'),
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                let dat = new FormData()
                                console.log(img)
                                dat.append('image',img)
                                dat.append('id',vis[0].id)
                                dat.append('classes',values.classes)
                                dat.append('date',values.date)
                                dat.append('address',values.address)
                                dat.append('total',values.total)
                                dat.append('outcome',values.outcome)

                                Axios.put('http://localhost:3000/forms/events/industrial_visits/edit',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    alert("Data Updated"),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 400);
                        }}
                    >
                        <Form method="PUT" className="form">
                            <h3>Edit Industrial Visits</h3>

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

export default Edit_visits