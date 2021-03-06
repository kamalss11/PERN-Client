import React, { useEffect } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import '../CSS/LS.css'
import {IoPerson} from 'react-icons/io5'
import {RiShieldUserFill} from 'react-icons/ri'
import {MdEmail} from 'react-icons/md'
import {AiFillLock} from 'react-icons/ai'
import { useState } from 'react'
import {TiArrowSortedUp} from 'react-icons/ti'
import {IoMdArrowDropdownCircle} from 'react-icons/io'
import {AiFillEye} from 'react-icons/ai'
import {AiFillEyeInvisible} from 'react-icons/ai'
import {RiUser3Fill} from 'react-icons/ri'
// import {AiFillCloseCircle} from 'react-icons/ai'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Signup(){
    const history = useHistory()
    const [btnld,Setbtnld] = useState(false)
    const [ers,Seters] = useState()
    const [select1,setSelect1] = useState('Select Department')
    const [drp1,Setdrp1] = useState(false)
    const [er1,setEr1] = useState(false)
    const [select2,setSelect2] = useState('Select Roll')
    const [drp2,Setdrp2] = useState(false)
    const [er2,setEr2] = useState(false)
    const [pstype,Setpstype] = useState('password')

    const Togglepass = ()=>{
        if(pstype === 'password'){
            Setpstype('text')
        }
        else{
            Setpstype('password')            
        }
    }

    const TextInput = ({ label,...props }) => {
        const [field,meta] = useField(props)
        return(
            <>
                <div className="fields">
                    <div>
                        {
                        label === 'pass' ?
                        <>
                            {pstype === 'password' ? <AiFillEyeInvisible onClick={Togglepass} className='sh' /> : <AiFillEye onClick={Togglepass} className='sh'/>}
                        </>  : ''}
                        {props.icon}
                        <input {...field}{...props}></input>
                    </div>
                    {
                        meta.touched && meta.error ?(
                            <p className="error">{meta.error}</p>
                        ):null
                    }
                </div>
            </>
        )
    }

    const MySelect = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <div className="fields">
                <div>
                    {pstype === 'password' ? <AiFillEyeInvisible onClick={Togglepass} className='sh' /> : <AiFillEye onClick={Togglepass} className='sh'/>}
                    {props.icon}
                    <select {...field} {...props} />
                </div>
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
            <div className='bg1'>
                <nav>
                    <h2 className='logo'>IQAC</h2>
                    <Link to='/signin'><RiUser3Fill />SignIn</Link>
                </nav>

                <div className='wel'>
                    <h3>Welcome !</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
                </div>
            </div>
            
            <div className='bg2'>
                <div className="signUp">
                    {/* <div className='rd'></div>
                    <div className='rd'></div>
                    <div className='rd'></div>
                    <div className='rd'></div>
                    <div className='rd'></div>
                    <div className='rd'></div> */}
                    {/* <div className='rd'></div>
                    <div className='rd'></div>
                    <div className='rd'></div>
                    <div className='rd'></div>
                    <div className='rd'></div> */}
                        <Formik
                            initialValues = {{
                                name: '',
                                email: '',
                                password: '',
                                confirm_Password: '',
                                date: ''
                            }}
                            validationSchema = {
                                Yup.object({
                                    name: Yup.string()
                                        .min(5,'Name must be greater than 5 characters')
                                        .required('Required'),
                                    email: Yup.string()
                                        .email('Invalid Email')
                                        .required('Required'),
                                    password: Yup.string()
                                        .min(4,'Password must be greater than 4 characters')
                                        .required('Required'),
                                    confirm_Password: Yup.string()
                                        .oneOf(
                                        [Yup.ref('password')],
                                        'Both password needs to be same'
                                        )
                                })
                            }

                            onSubmit={(values, { setSubmitting,resetForm }) => {
                                Setbtnld(!btnld)
                                if(select1 === 'Select Department' && select2 === 'Select Roll'){
                                    Setbtnld(false)
                                    setEr1(true)
                                    setEr2(true)
                                }
                                else if(select1 === 'Select Department'){
                                    Setbtnld(false)
                                    setEr1(true)
                                }
                                else if(select2 === 'Select Roll'){
                                    Setbtnld(false)
                                    setEr2(true)
                                }
                                else{
                                    setTimeout(async () => {
                                        const res = await fetch("/",{
                                            method: "POST",
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                name : values.name,
                                                department : select1,
                                                email : values.email,
                                                roll : select2,
                                                password : values.password,
                                                cpassword : values.confirm_Password
                                            })
                                        })
            
                                        const data = await res.json()
                                        if(res.status === 422 || !data){
                                            Setbtnld(false)
                                            // Seters(data.error)
                                            toast.error(data.error,{autoClose: 1000})
                                        }
                                        else{
                                            // window.alert("Registration Successfull")
                                            toast.success('Registration Successful',{autoClose:1000})
                                            setSubmitting(false);
                                            resetForm()
                                            history.push('/signin')
                                        }
                                    }, 400);
                                }
                            }}
                        >
                            <Form method="POST" className="form">
                                <div style={{textAlign:'center'}}>
                                    {/* <h3>Internal Quality Assurance Cell - (IQAC)</h3><br /> */}
                                    <h3>SignUp</h3>
                                </div>

                                {/* {ers ? <p className='se err'><AiFillCloseCircle />{ers}</p> : null} */}

                                <TextInput icon={<IoPerson/>}
                                    name="name"
                                    placeholder='Enter your name'
                                    type="text"
                                />

                                <TextInput icon={<MdEmail/>}
                                    name="email"
                                    type="text"
                                    placeholder="Enter your Email"
                                />

                                <div className="fields">
                                    <div>
                                        <RiShieldUserFill />
                                        <div onClick={e=>{Setdrp1(!drp1);Setdrp2(false)}}>{select1 ? select1 : ''}<IoMdArrowDropdownCircle className={`${drp1 ? 'd active' : 'd'}`} />
                                            <div className={`${drp1 ? 'active' : ''}`}>
                                            <p onClick={e=>{setSelect1("BCA");setEr1(false)}}>BCA</p>
                                            <p onClick={e=>{setSelect1("B.Sc(CS-A)");setEr1(false)}}>B.Sc(CS-A)</p>
                                            <p onClick={e=>{setSelect1("B.Sc(CS-B)");setEr1(false)}}>B.Sc(CS-B)</p>
                                            <p onClick={e=>{setSelect1("B.Sc(CT)");setEr1(false)}}>B.Sc(CT)</p>
                                            <p onClick={e=>{setSelect1("B.Sc(IT)");setEr1(false)}}>B.Sc(IT)</p>
                                            <p onClick={e=>{setSelect1("M.Sc(SS)");setEr1(false)}}>M.Sc(SS)</p>
                                            <p onClick={e=>{setSelect1("BDA");setEr1(false)}}>BDA</p>
                                            <p onClick={e=>{setSelect1("B.Voc(Networking and Mobile Application)");setEr1(false)}}>B.Voc(Networking and Mobile Application)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`${er1 ? 'error dp active' : 'error dp'}`}>Required</p>
                                </div>

                                <div className="fields">
                                    <div className='us'>
                                        <RiShieldUserFill />
                                        <div onClick={e=>{Setdrp2(!drp2);Setdrp1(false)}}>{select2 ? select2 : ''}<IoMdArrowDropdownCircle className={`${drp2 ? 'd active' : 'd'}`} />
                                            <div className={`${drp2 ? 'active' : ''}`}>
                                            <p onClick={e=>{setSelect2("User");setEr2(false)}}>User</p>
                                            <p onClick={e=>{setSelect2("SuperAdmin");setEr2(false)}}>SuperAdmin</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`${er2 ? 'error dp active' : 'error dp'}`}>Required</p>
                                </div>

                                <TextInput icon={<AiFillLock />}
                                    name="password"
                                    type={pstype}
                                    placeholder="Enter Password"
                                    label={'pass'}
                                />

                                <TextInput icon={<AiFillLock />}
                                    name="confirm_Password"
                                    type="password"
                                    placeholder="Re-enter Password"
                                />
                                
                                <div className="btn">
                                    {
                                        btnld ? 
                                        <button style={{pointerEvents: 'none'}}><i class="fa fa-spinner fa-spin"></i> Loading
                                        </button> : 

                                        <button type="submit">SignUp <TiArrowSortedUp />
                                        </button>
                                    }
                                </div>
                            </Form>
                        </Formik>   
                        <p className='bt'>
                            Already have an Account ?
                            <b><Link to={'/signin'}> SignIn</Link> </b>
                        </p>                                
                </div>
            </div>
        </>
    )
}

export default Signup