import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'
import Axios from 'axios'

function Edit_mou(){
    const [img,setimg] = useState()
    const [uData,setUdata] = useState()
    const [mou,setMou] = useState()
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

            const mo = await fetch(`/forms/collaborations/mou/edit/${window.localStorage.getItem('edit')}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const m = await mo.json()
            setMou(m)

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
                        <h4 className='h'>Collaborations</h4>
                    </div>

                    <div className="fo">
                    <Formik
                        initialValues = {{
                            organization: `${mou ? mou[0].organization : ''}`,
                            date_signed: `${mou ? mou[0].date_signed : ''}`,
                            period: `${mou ? mou[0].period : ''}`,
                            participants: `${mou ? mou[0].participants : ''}`,
                            purpose: `${mou ? mou[0].purpose : ''}`,
                            total: `${mou ? mou[0].total : ''}`,
                            date: `${mou ? mou[0].date : ''}`,
                            image: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({                                     
                                organization: Yup.string()
                                    .required('Required'),
                                date_signed: Yup.string(),
                                period: Yup.string(),
                                participants: Yup.string(),
                                purpose: Yup.string(),
                                total: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }                   

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                let dat = new FormData()
                                console.log(img)
                                dat.append('image',img)
                                dat.append('id',mou[0].id)
                                dat.append('organization',values.organization)
                                dat.append('date_signed',values.date_signed)
                                dat.append('period',values.period)
                                dat.append('participants',values.participants)
                                dat.append('purpose',values.purpose)
                                dat.append('total',values.total)
                                dat.append('date',values.date)

                                Axios.put('http://localhost:3000/forms/collaborations/mou/edit',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    alert("Data Updated"),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 400);
                        }}
                    >
                        <Form method="PUT" className="form">
                            <h3>Edit MoU(s) Signed</h3>

                            <TextInput
                                id="organization"
                                name="organization"
                                type="text"
                                label="Organization"
                            />

                            <TextInput
                                id="date_signed"
                                name="date_signed"
                                type="date"
                                label="Date Signed"
                            />

                            <TextInput
                                id="period"
                                name="period"
                                type="text"
                                label="Period (from - to)"
                            />

                            <TextInput
                                id="participants"
                                name="participants"
                                type="text"
                                label="Participants (No. of Students and No. of Faculty)"
                            />

                            <TextInput
                                id="purpose"
                                name="purpose"
                                type="text"
                                label="Purpose"
                            /> 

                            <TextInput
                                id="total"
                                name="total"
                                type="text"
                                label="Total No. of Beneficiaries"
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

export default Edit_mou