import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'
import Axios from 'axios'

function Edit_awards(){
    const [img,setimg] = useState()
    const [uData,setUdata] = useState()
    const [awd,setAwd] = useState()
    const [men,setMen] = useState(false)
    const editprofile = `/dashboard/editprofile/${uData ? uData[0].id : ''}`
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

            const aw = await fetch(`/forms/research/awards_for_innovation/edit/${window.localStorage.getItem('edit')}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const ad = await aw.json()
            setAwd(ad)

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
                            awardee_name: `${awd ? awd[0].awardee_name : ''}`,
                            designation: `${awd ? awd[0].designation : ''}`,
                            award_category: `${awd ? awd[0].award_category : ''}`,
                            title: `${awd ? awd[0].title : ''}`,
                            awarding_agency: `${awd ? awd[0].awarding_agency : ''}`,
                            venue: `${awd ? awd[0].venue : ''}`,
                            level: `${awd ? awd[0].level : ''}`,
                            date: `${awd ? awd[0].date : ''}`,
                            image: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({
                                awardee_name: Yup.string(),
                                designation: Yup.string(),                                       
                                award_category: Yup.string(),
                                title: Yup.string()
                                    .required('Required'),
                                awarding_agency: Yup.string(),
                                venue: Yup.string(),
                                level: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                let dat = new FormData()
                                console.log(img)
                                dat.append('image',img)
                                dat.append('id',awd[0].id)
                                dat.append('awardee_name',values.awardee_name)
                                dat.append('designation',values.designation)
                                dat.append('award_category',values.award_category)
                                dat.append('title',values.title)
                                dat.append('awarding_agency',values.awarding_agency)
                                dat.append('venue',values.venue)
                                dat.append('level',values.level)
                                dat.append('date',values.date)

                                Axios.put('http://localhost:3000/forms/research/awards_for_innovation/edit',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    alert("Data Updated"),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 400);
                        }}
                    >
                        <Form method="PUT" className="form">
                            <h3>Edit Awards for Innovation</h3>
                            <TextInput
                                id="title"
                                name="title"
                                type="text"
                                label="Title of the innovation"
                            />

                            <TextInput
                                id="award_category"
                                name="award_category"
                                type="text"
                                label="Award Category"
                            />

                            <TextInput
                                id="awardee_name"
                                name="awardee_name"
                                type="text"
                                label="Name of the awardee"
                            />

                            <TextInput
                                id="designation"
                                name="designation"
                                type="text"
                                label="Designation"
                            />

                            <TextInput
                                id="awarding_agency"
                                name="awarding_agency"
                                type="text"
                                label="Awarding Agency"
                            />         

                            <TextInput
                                id="venue"
                                name="venue"
                                type="text"
                                label="Venue"
                            />    

                            <MySelect name="level" label="Level">
                                <option value="">--Level--</option>
                                <option value="Regional">Regional</option>
                                <option value="State">State</option>
                                <option value="National">National</option>
                                <option value="International">International</option>
                            </MySelect>  

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

export default Edit_awards