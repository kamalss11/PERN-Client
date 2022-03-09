import React,{useEffect,useState} from 'react'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import { Link,useHistory } from 'react-router-dom'
import '../CSS/LS.css'
import {IoPerson} from 'react-icons/io5'
import {AiFillLock} from 'react-icons/ai'
import {TiArrowSortedUp} from 'react-icons/ti'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
toast.configure()

function Signin(){
    const history = useHistory()
    const [btnld,Setbtnld] = useState(false)
    const [ers,Seters] = useState()

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
            console.log(datas)

            if(!res.status === 200){
                console.log(datas.error)
            }
            else if(datas.user){
                history.push('/dashboard')
            }
        }catch(err){
            console.log(err)
        }
    }

    const TextInput = ({ label,...props }) => {
        const [field,meta] = useField(props)
        return(
            <>
                <div className="fields">
                    <div>
                        {props.icon}
                        <input {...field}{...props}></input>
                        <label htmlFor={props.id || props.name}>{label}</label>
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

    useEffect(() => {
        callAboutPage()
    },[])
    return(
        <>
            <div className='bg1'>
                <nav style={{justifyContent:'center'}}>
                    <h2 className='logo'>IQAC</h2>
                </nav>

                <div className='wel'>
                    <h3>Welcome !</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
                </div>
            </div>

            <div className='bg2' style={{height: '500px'}}>
                <div className="signUp" style={{top: '-25%'}}>
                    {/* <div className='rd'></div>
                    <div className='rd'></div>
                    <div className='rd'></div>
                    <div className='rd'></div>
                    <div className='rd'></div>
                    <div className='rd'></div> */}
                    <Formik
                        initialValues = {{
                            email: '',
                            password: ''
                        }}
                        
                        validationSchema = {
                            Yup.object({
                                email: Yup.string()
                                    .email('Invalid Email')
                                    .required('Required'),
                                password: Yup.string()
                                    .min(4,'Password must be greater than 4 characters')
                                    .required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                Setbtnld(!btnld)
                                const res = await fetch('/signin',{
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        email : values.email,
                                        password : values.password
                                    })
                                })

                                const data = await res.json()
                                if(res.status === 400 || !data){
                                    Setbtnld(false)
                                    Seters(data.error)
                                    toast.error(data.error,{autoClose:1000})
                                }
                                else{
                                    toast.success('Signin Successful',{autoClose:1000})
                                    setSubmitting(false);
                                    resetForm()
                                    if(data.login[0].roll === 'User') 
                                        history.push('/dashboard')  
                                    else
                                        history.push('/super_admin') 
                                }
                            }, 400);
                        }}
                    >
                        <Form method="POST" className="form">
                            <div style={{textAlign:'center'}}>
                                {/* <h3>Internal Quality Assurance Cell - (IQAC)</h3><br /> */}
                                <h3>SignIn</h3>
                            </div>

                            {/* {ers ? <p className='se err'><AiFillCloseCircle />{ers}</p> : null} */}

                            <TextInput
                                icon={<IoPerson/>}
                                name="email"
                                type="text"
                                placeholder="Enter your Email"
                            />

                            <TextInput
                                icon={<AiFillLock />}
                                name="password"
                                type="password"
                                placeholder="Enter Password"
                            />

                            <div className="btn">
                                {
                                    btnld ? 
                                    <button style={{pointerEvents: 'none'}}><i class="fa fa-spinner fa-spin"></i> Loading
                                    </button> : 

                                    <button type="submit">SignIn <TiArrowSortedUp />
                                    </button>
                                }
                            </div>
                        </Form>
                    </Formik>     
                      
                    <p className='bt'>
                        <Link to={'/forget_password'}>Forget Password ?</Link>
                    </p>                                  
                </div>
            </div>
        </>
    )
}

export default Signin