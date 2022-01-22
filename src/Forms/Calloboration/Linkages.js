import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'
import Axios from 'axios'

function Linkages(){
    const [img,setimg] = useState()
    const [uData,setUdata] = useState()
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

                    <div className='dprt'>
                        <h4>Internal Quality Assurance Cell (IQAC)</h4>
                        <h4>Department : {uData ? uData[0].department : null } - Staffs</h4>
                        <h4 className='h'>Collaborations</h4>
                    </div>

                    <div className="fo">
                    <Formik
                        initialValues = {{
                            title: '',
                            partnering_agency: '',
                            period: '',
                            date: '',
                            image: '',
                            n: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({                                     
                                title: Yup.string()
                                    .required('Required'),
                                partnering_agency: Yup.string(),
                                period: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                let dat = new FormData()
                                console.log(img)
                                dat.append('image',img)
                                dat.append('n',values.n)
                                dat.append('title',values.title)
                                dat.append('partnering_agency',values.partnering_agency)
                                dat.append('period',values.period)
                                dat.append('date',values.date)
                                dat.append('department',uData[0].department)

                                Axios.post('http://localhost:3000/forms/collaborations/linkages',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    alert("Data Inserted"),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 400);
                        }}
                    >
                        <Form method="POST" className="form">
                            <h3>Linkages</h3>
                            
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
                                label="Nature and title of the Linkage"
                            />

                            <TextInput
                                id="partnering_agency"
                                name="partnering_agency"
                                type="text"
                                label="Partnering Agency"
                            />

                            <TextInput
                                id="period"
                                name="period"
                                type="text"
                                label="Period"
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

export default Linkages