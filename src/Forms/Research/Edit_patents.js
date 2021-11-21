import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'

function Edit_patents(){
    const [uData,setUdata] = useState()
    const [pat,setpat] = useState()
    const [men,setMen] = useState(false)
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

            const pa = await fetch(`/forms/research/patents/edit/${window.localStorage.getItem('edit')}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const patents = await pa.json()
            console.log(patents)
            setpat(patents)

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
                    
                    <div className="fo">
                    <Formik
                        initialValues = {{
                            title: `${pat ? pat[0].title : ''}`,
                            field: `${pat ? pat[0].field : ''}`,
                            fileno: `${pat ? pat[0].fileno : ''}`,
                            date_awarded_patent: `${pat ? pat[0].date_awarded_patent : ''}`,
                            royalty_received: `${pat ? pat[0].royalty_received : ''}`,
                            providing_agency: `${pat ? pat.providing_agency : ''}`,
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
                                const res = await fetch(`/forms/research/patents/edit`,{
                                    method: "PUT",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        id: `${window.localStorage.getItem('edit')}`,
                                        title: values.title,
                                        field: values.field,
                                        fileno: values.fileno,
                                        date_awarded_patent: values.date_awarded_patent,
                                        royalty_received: values.royalty_received,
                                        providing_agency: values.providing_agency,
                                        country: values.country,
                                        date: values.date
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
                                    window.localStorage.setItem('edit','')
                                    history.push("/dashboard")
                                }
                            }, 400);
                        }}
                    >
                        <Form method="PUT" className="form">
                            <h3>Edit Patents</h3>
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

export default Edit_patents