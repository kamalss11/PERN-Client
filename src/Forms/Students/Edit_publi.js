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

function Edit_publi(){
    const [uData,setUdata] = useState()
    const [men,setMen] = useState(false)
    const [img,setimg] = useState()
    const [place,setPlace] = useState()
    const editprofile = `/dashboard/editprofile/${uData ? uData._id : ''}`
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

            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }

            const place = await fetch(`/forms/student/s_publications/edit/${window.localStorage.getItem('edit')}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const r = await place.json()
            console.log(r)
            setPlace(r)
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
                        <h4>Department : {uData ? uData[0].department : null } - Students</h4>
                        <h4 className='h'>Students Details</h4>
                    </div>
                    
                    <div className="fo">
                    <Formik
                        initialValues = {{
                            roll_no: `${place ? place[0].roll_no : null}`,
                            title: `${place ? place[0].title : null}`,
                            date: `${place ? place[0].date : null}`,
                            n: `${place ? place[0].n : null}`,
                            njournal: `${place ? place[0].n_journal : null}`,
                            issn: `${place ? place[0].issn : null}`,
                            volume: `${place ? place[0].volume : null}`,
                            sci: `${place ? place[0].sci : null}`,
                            impact: `${place ? place[0].impact : null}`,
                            level: `${place ? place[0].level : null}`,
                            date: `${place ? place[0].date : null}`,
                            image: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({
                                n: Yup.string()
                                        .required('Required'),
                                roll_no: Yup.string()
                                    .required('Required'),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {  
                                let dat = new FormData()
                                dat.append('image',img)
                                dat.append('id',place[0].id)
                                dat.append('n',values.n)
                                dat.append('roll_no',values.roll_no)
                                dat.append('title',values.title)
                                dat.append('date',values.date)
                                dat.append('njournal',values.njournal)
                                dat.append('issn',values.issn)
                                dat.append('volume',values.volume)
                                dat.append('sci',values.sci)
                                dat.append('level',values.level)
                                dat.append('impact',values.impact)

                                Axios.put('http://localhost:3000/forms/student/s_publications/edit',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    alert("Data Updated"),
                                    history.push("/dashboard/view_students"))
                                .catch(err => console.log(err))
                            },600)
                        }}
                    >
                        <Form method="PUT" encType='multipart/form-data' className="form">
                            <h3>Edit Placements</h3>                            

                            <TextInput
                                id="n"
                                name="n"
                                type="text"
                                label="Name of the Student"
                            />
                            
                            <TextInput
                                id="roll_no"
                                name="roll_no"
                                type="text"
                                label="Roll Number"
                            />
    
                            <TextInput
                                id="title"
                                name="title"
                                type="text"
                                label="Title of the paper"
                            />
    
                            <TextInput
                                id="njournal"
                                name="njournal"
                                type="text"
                                label="Name of the Journal"
                            />
    
                            <TextInput
                                id="issn"
                                name="issn"
                                type="text"
                                label="ISSN No. & DoI."
                            />
    
                            <TextInput
                                id="volume"
                                name="volume"
                                type="text"
                                label="Volume No. , Issue &  Page No."
                            />
    
                            <TextInput
                                id="sci"
                                name="sci"
                                type="text"
                                label="SCI/SCIE/Scopus Indexed / UGC Recognized / Others"
                            />
    
                            <TextInput
                                id="impact"
                                name="impact"
                                type="text"
                                label="Impact Factor (as per SCI)"
                            />

                            <MySelect name="level" label="International / National">
                                <option value="">--International/National--</option>
                                <option value="International">International</option>
                                <option value="National">National</option>
                            </MySelect>

                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                label="Date of Happen"
                            />

                            <div className='fields'>
                                <label htmlFor='file'>Upload New File or it will replace with old file</label>

                                <input type="file" id='file' name='image' onChange={e=>setimg(e.target.files[0])}/>       
                            </div> 

                            <div className="btn">
                                {/* <button type="reset">Reset</button> */}
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

export default Edit_publi