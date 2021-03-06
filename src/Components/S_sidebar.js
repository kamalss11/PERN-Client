import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Sbar from '../Datas/S_data'
import Student_details from '../Datas/student_details'
import {FaWpforms} from 'react-icons/fa'
import {AiOutlineLogout} from 'react-icons/ai'
import AppContext from '../Context/context'
import {FaFileWord} from 'react-icons/fa'

function S_sidebar(){
    const {bar} = useContext(AppContext)
    const export_all = ()=>{
        if (!window.Blob) {
            alert('Your legacy browser does not support this action.');
            return;
        }
      
        var html, link, blob, url, css;
        
        // EU A4 use: size: 841.95pt 595.35pt;
        // US Letter use: size:11.0in 8.5in;
        
        css = (
          '<style>' +
          '@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}' +
          'div.WordSection1 {page: WordSection1;}' +
          'table{width:100%;border-collapse:collapse;}td,th{border:1px gray solid;width:5em;padding:2px;}'+
          '</style>'
        );
        
        html = window.docx.innerHTML;
        blob = new Blob(['\ufeff', css + html], {
          type: 'application/msword'
        });
        url = URL.createObjectURL(blob);
        link = document.createElement('A');
        link.href = url;
        // Set default file name. 
        // Word will append file extension - do not add an extension here.
        link.download = 'Document';   
        document.body.appendChild(link);
        if (navigator.msSaveOrOpenBlob ) navigator.msSaveOrOpenBlob( blob, 'Document.doc'); // IE10-11
        else link.click();  // other browsers
        document.body.removeChild(link);
    }
    return (
        <div className={`sidebar ${bar ? `activate` : ''}`}>
            <h2 className="stitle">IQAC</h2>

            <ul>
                {
                    Sbar.map((bar)=>{
                        const {id,url,name,icon} = bar
                        return(
                            <li key={id}>
                                <Link to={url}>{icon} {name}</Link>
                            </li>
                        )
                    })
                }

                <li className="forms">
                    <FaWpforms /> Forms
                </li>

                <li className="forms" style={{cursor:" pointer"}}>
                    <p className="expall" onClick={e=>export_all()}><FaFileWord />Export All</p>
                </li>

                <ul>
                    <li>Student Details</li>
                    {
                        Student_details.map((fname)=>{
                            const {id,name,url} = fname
                            return(
                                <li key={id}>
                                    <Link key={id} to={url}>{name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>

                <li>
                    <Link to='/logout'><AiOutlineLogout /> Logout</Link>
                </li>
            </ul>
        </div>
    )
}

export default S_sidebar