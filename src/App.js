import React, { useState } from 'react';
import './CSS/App.css';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom'
// Components
import Signin from './Pages//Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Logout from './Pages/Logout'
import Profile from './Pages/Profile'
import Editprofile from './Pages/Editprofile'
import Researchprojects from './Forms//Research/Researchprojects'
import Edit_research_projects from './Forms//Research/Edit_research_projects'
import Patents from './Forms//Research/Patents'
import Awards from './Forms/Research/Awards'
import Deg from './Forms/Research/Phd'
import Fellowship from './Forms/Research/Fellowship'
import Activities from './Forms/Calloboration/Activities';
import Linkages from './Forms/Calloboration/Linkages';
import Projects_services from './Forms/Consultancy/Projects_services';
import Conference from './Forms/E_P_organized/Conference';
import Lectures from './Forms/E_P_organized/Lectures';
import Extension from './Forms/E_P_organized/Extension';
import Visits from './Forms/E_P_organized/Visits';
import Evs from './Forms/E_P_organized/Evs';
import Departmental from './Forms/E_P_organized/Departmental';
import Honours from './Forms/Faculties/Honours';
import Exams from './Forms/Faculties/Exams';
import Books_published from './Forms/Faculties/Books_published';
import Chapters_contributed from './Forms/Faculties/Chapters_contributed';
import Conference_proceeding from './Forms/Faculties/Conference_proceeding';
import Conferences from './Forms/Faculties/Conference';
import Paper_presentation from './Forms/Faculties/Paper_presentaion';
import Journal_publications from './Forms/Faculties/Journal_publications';
import Resource_person from './Forms/Faculties/Resource_person';
import Financial_support from './Forms/Faculties/Financial_support';
import Development_programmes from './Forms/Faculties/Development_programmes';
import Online_courses from './Forms/Faculties/Online_courses';
import E_content from './Forms/Faculties/E_content';
import Mou from './Forms/Calloboration/Mou';
import Edit_patents from './Forms/Research/Edit_patents';
import Edit_awards from './Forms/Research/Edit_awards';
import Edit_phd from './Forms/Research/Edit_phd';
import Edit_fellowship from './Forms/Research/Edit_fellowship';
import Edit_activities from './Forms/Calloboration/Edit_activities';
import Edit_linkages from './Forms/Calloboration/Edit_linkages';
import Edit_mou from './Forms/Calloboration/Edit_mou';
import Edit_conference from './Forms/E_P_organized/Edit_conference';
import Edit_lectures from './Forms/E_P_organized/Edit_lectures';
import Edit_extension from './Forms/E_P_organized/Edit_extension';
import Edit_visits from './Forms/E_P_organized/Edit_visits';
import Edit_evs from './Forms/E_P_organized/Edit_evs';
import Edit_departmental from './Forms/E_P_organized/Edit_departmental';
import Edit_pro from './Forms/Consultancy/Edit_projects';
import Edit_honours from './Forms/Faculties/Edit_honours';
import Edit_exams from './Forms/Faculties/Edit_exams';
import Edit_books from './Forms/Faculties/Edit_books';
import Edit_chapters from './Forms/Faculties/Edit_chapters';
import Edit_confep from './Forms/Faculties/Edit_confep';
import Edit_paper from './Forms/Faculties/Edit_paper';
import Edit_journal from './Forms/Faculties/Edit_journal';
import Edit_conferene from './Forms/Faculties/Edit_conference';
import Edit_resource from './Forms/Faculties/Edit_resourceperson';
import Edit_financial from './Forms/Faculties/Edit_financial';
import Edit_development from './Forms/Faculties/Edit_development';
import Edit_onlinecourses from './Forms/Faculties/Edit_onlinecourses';
import Edit_econtent from './Forms/Faculties/Edit_econtent';
import AppContext from './Context/context';
import Export_staffs from './Admin/Export_staffs';
import Forget_Password from './Pages/Forget_password';
import Reset_password from './Pages/Reset_password';
import Super_admin from './Super_admin/Super_admin';
import Staffs from './Super_admin/Staffs';
import Students from './Super_admin/Students';
import Research_projects from './Super_admin/Overall/Staffs/research_projects';
import Pat from './Super_admin/Overall/Staffs/patents';
import Aw from './Super_admin/Overall/Staffs/awards';
import De from './Super_admin/Overall/Staffs/deg';
import Fe from './Super_admin/Overall/Staffs/fellowship';
import Ca from './Super_admin/Overall/Staffs/collab_activ';
import Li from './Super_admin/Overall/Staffs/linkages';
import Mo from './Super_admin/Overall/Staffs/mou';
import Co from './Super_admin/Overall/Staffs/conference';
import Gl from './Super_admin/Overall/Staffs/guestl';
import Ea from './Super_admin/Overall/Staffs/extensiona';
import Iv from './Super_admin/Overall/Staffs/industrialv';
import Ev from './Super_admin/Overall/Staffs/evsv';
import Da from './Super_admin/Overall/Staffs/departmentala';
import Ps from './Super_admin/Overall/Staffs/projects';
import Ho from './Super_admin/Overall/Staffs/honours';
import Ex from './Super_admin/Overall/Staffs/exams';
import Bp from './Super_admin/Overall/Staffs/booksp';
import Cc from './Super_admin/Overall/Staffs/chaptersc';
import Cp from './Super_admin/Overall/Staffs/conferencep';
import Pp from './Super_admin/Overall/Staffs/Paperp';
import Jp from './Super_admin/Overall/Staffs/journalp';
import Fc from './Super_admin/Overall/Staffs/f_conf';
import Rp from './Super_admin/Overall/Staffs/resourcep';
import Fs from './Super_admin/Overall/Staffs/financials';
import Dp from './Super_admin/Overall/Staffs/developmentp';
import Oc from './Super_admin/Overall/Staffs/onlinec';
import Ec from './Super_admin/Overall/Staffs/econ';
import Pl from './Super_admin/Overall/Students/placements';
import Pub from './Super_admin/Overall/Students/publications';
import StuPp from './Super_admin/Overall/Students/paperp';
import StuCon from './Super_admin/Overall/Students/conference';
import StuCom from './Super_admin/Overall/Students/competition';
import Stutra from './Super_admin/Overall/Students/training';
import Stupw from './Super_admin/Overall/Students/projectwork';
import Stuexm from './Super_admin/Overall/Students/exams';
import StuOc from './Super_admin/Overall/Students/onlinec';
import StuAc from './Super_admin/Overall/Students/achievements';
import Viewstaffs from './Pages/View_staffs';
import Add_staffs from './Pages/Add_staffs';
import Viewstudents from './Pages/View_students';
import Export_student from './Admin/Export_student';
import Add_students from './Pages/Add_students';
import Edit_Placements from './Forms/Students/Edit_place';
import Placements from './Forms/Students/Placements';
import Edit_publi from './Forms/Students/Edit_publi';
import Publications from './Forms/Students/Publications';
import SPpr from './Forms/Students/paper_presentation';
import Edit_Paper_presentation from './Forms/Students/Edit_ppresen';
import SConference from './Forms/Students/Conference';
import Edit_conf from './Forms/Students/Edit_conf';
import SComp from './Forms/Students/Competition';
import Edit_compet from './Forms/Students/Edit_compet';
import STraining from './Forms/Students/Training';
import Edit_Trai from './Forms/Students/Edit_trai';
import SPrjct from './Forms/Students/Projectwr';
import Edit_prj from './Forms/Students/Edit_prjct';
import SExams from './Forms/Students/Exams';
import Edit_exms from './Forms/Students/Edit_exms';
import SOncou from './Forms/Students/On_cou';
import Edit_onc from './Forms/Students/Edit_onc';
import SAchiv from './Forms/Students/Achivement';
import Edit_achiv from './Forms/Students/Edit_achiv';
import Not from './Pages/Not';

function App() {
  const Routing = ()=>{
    return(
      <Router>
        <Switch>
          <Route exact path="/">
            <Signin />
          </Route>

          <Route exact path="/signin">
            <Signin />
          </Route>

          <Route exact path="/all_registers">
            <Signup />
          </Route>

          <Route exact path="/dashboard">
            <Dashboard />
          </Route>

          <Route exact path="/dashboard/view_staffs">
            <Viewstaffs />
          </Route>

          <Route exact path="/dashboard/view_students">
            <Viewstudents />
          </Route>

          <Route exact path="/dashboard/staffs_export">
            <Export_staffs />
          </Route>

          <Route exact path="/dashboard/students_export">
            <Export_student />
          </Route>

          <Route exact path="/dashboard/add_staffs">
            <Add_staffs />
          </Route>

          <Route exact path="/dashboard/add_students">
            <Add_students />
          </Route>

          <Route exact path="/forget_password">
            <Forget_Password />
          </Route>

          <Route exact path="/reset_password/:token">
            <Reset_password />
          </Route>

          <Route exact path="/dashboard/profile">
            <Profile />
          </Route>

          <Route exact path="/dashboard/editprofile">
            <Editprofile />
          </Route>

          <Route exact path="/super_admin">            
            <Super_admin />
          </Route>

          <Route exact path="/super_admin/departments/staffs/:department">            
            <Staffs />
          </Route>

          <Route exact path="/super_admin/departments/students/:department">            
            <Students />
          </Route>

          <Route exact path="/super_admin/overall/staffs/research_projects">            
            <Research_projects />
          </Route>

          <Route exact path="/super_admin/overall/staffs/patents">            
            <Pat />
          </Route>

          <Route exact path="/super_admin/overall/staffs/awards_for_innovation">            
            <Aw />
          </Route>

          <Route exact path="/super_admin/overall/staffs/deg">            
            <De />
          </Route>

          <Route exact path="/super_admin/overall/staffs/fellowship">            
            <Fe />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/collaborative_activities">            
            <Ca />
          </Route>

          <Route exact path="/super_admin/overall/staffs/linkages">            
            <Li />
          </Route>

          <Route exact path="/super_admin/overall/staffs/mou">            
            <Mo />
          </Route>

          <Route exact path="/super_admin/overall/staffs/conference">            
            <Co />
          </Route>

          <Route exact path="/super_admin/overall/staffs/guest_lectures">            
            <Gl />
          </Route>

          <Route exact path="/super_admin/overall/staffs/extension_activities">            
            <Ea />
          </Route>

          <Route exact path="/super_admin/overall/staffs/industrial_visits">            
            <Iv />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/evs">            
            <Ev />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/departmental_activities">            
            <Da />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/projects_services">            
            <Ps />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/honours">            
            <Ho />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/exams">            
            <Ex />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/books_published">            
            <Bp />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/chapters_contributed">            
            <Cc />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/conference_proceeding">            
            <Cp />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/paper_presentation">            
            <Pp />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/journal_publications">            
            <Jp />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/f_conference">            
            <Fc />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/resource_person">            
            <Rp />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/financial_support">            
            <Fs />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/development_programmes">            
            <Dp />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/online_courses">            
            <Oc />
          </Route>
          
          <Route exact path="/super_admin/overall/staffs/e_content">            
            <Ec />
          </Route>
          
          <Route exact path="/super_admin/overall/students/placements">            
            <Pl />
          </Route>
          
          <Route exact path="/super_admin/overall/students/s_publications">            
            <Pub />
          </Route>
          
          <Route exact path="/super_admin/overall/students/s_paper_presentation">            
            <StuPp />
          </Route>
          
          <Route exact path="/super_admin/overall/students/s_conference">            
            <StuCon />
          </Route>
          
          <Route exact path="/super_admin/overall/students/s_competition">            
            <StuCom />
          </Route>
          
          <Route exact path="/super_admin/overall/students/s_training">            
            <Stutra />
          </Route>
          
          <Route exact path="/super_admin/overall/students/s_projectwork">            
            <Stupw />
          </Route>
          
          <Route exact path="/super_admin/overall/students/s_exams">            
            <Stuexm />
          </Route>
          
          <Route exact path="/super_admin/overall/students/s_onlinecourses">            
            <StuOc />
          </Route>
          
          <Route exact path="/super_admin/overall/students/s_achievements">            
            <StuAc />
          </Route>

          {/* Research */}

          <Route exact path="/forms/research/research_projects">
            <Researchprojects />
          </Route>

          <Route exact path="/forms/research/research_projects/edit">
            <Edit_research_projects />
          </Route>

          <Route exact path="/forms/research/patents">
            <Patents />
          </Route>

          <Route exact path="/forms/research/patents/edit">
            <Edit_patents />
          </Route>

          <Route exact path="/forms/research/awards_for_innovation">
            <Awards />
          </Route>

          <Route exact path="/forms/research/awards_for_innovation/edit">
            <Edit_awards />
          </Route>

          <Route exact path="/forms/research/deg">
            <Deg />
          </Route>

          <Route exact path="/forms/research/deg/edit">
            <Edit_phd />
          </Route>

          <Route exact path="/forms/research/fellowship">
            <Fellowship />
          </Route>

          <Route exact path="/forms/research/fellowship/edit">
            <Edit_fellowship />
          </Route>

          {/* Collaborations */}

          <Route exact path="/forms/collaborations/collaborative_activities">
            <Activities />
          </Route>

          <Route exact path="/forms/collaborations/collaborative_activities/edit">
            <Edit_activities />
          </Route>

          <Route exact path="/forms/collaborations/linkages">
            <Linkages />
          </Route>

          <Route exact path="/forms/collaborations/linkages/edit">
            <Edit_linkages />
          </Route>

          <Route exact path="/forms/collaborations/mou">
            <Mou />
          </Route>

          <Route exact path="/forms/collaborations/mou/edit">
            <Edit_mou />
          </Route>

          {/*EVENTS/PROGRAMMES/VISITS ORGANIZED  */}

          <Route exact path="/forms/events/conference">
            <Conference />
          </Route>

          <Route exact path="/forms/events/conference/edit">
            <Edit_conference />
          </Route>

          <Route exact path="/forms/events/guest_lectures">
            <Lectures />
          </Route>

          <Route exact path="/forms/events/guest_lectures/edit">
            <Edit_lectures />
          </Route>

          <Route exact path="/forms/events/extension_activities">
            <Extension />
          </Route>

          <Route exact path="/forms/events/extension_activities/edit">
            <Edit_extension />
          </Route>

          <Route exact path="/forms/events/industrial_visits">
            <Visits />
          </Route>

          <Route exact path="/forms/events/industrial_visits/edit">
            <Edit_visits />
          </Route>

          <Route exact path="/forms/events/evs">
            <Evs />
          </Route>

          <Route exact path="/forms/events/evs/edit">
            <Edit_evs />
          </Route>

          <Route exact path="/forms/events/departmental_activities">
            <Departmental />
          </Route>

          <Route exact path="/forms/events/departmental_activities/edit">
            <Edit_departmental />
          </Route>

          {/* Consultancy */}

          <Route exact path="/forms/consultancy/projects_services">
            <Projects_services />
          </Route>

          <Route exact path="/forms/consultancy/projects_services/edit">
            <Edit_pro />
          </Route>

          {/* Faculties */}

          <Route exact path="/forms/faculty/honours">
            <Honours />
          </Route>

          <Route exact path="/forms/faculty/honours/edit">
            <Edit_honours />
          </Route>

          <Route exact path="/forms/faculty/exams">
            <Exams />
          </Route>

          <Route exact path="/forms/faculty/exams/edit">
            <Edit_exams />
          </Route>

          <Route exact path="/forms/faculty/books_published">
            <Books_published />
          </Route>

          <Route exact path="/forms/faculty/books_published/edit">
            <Edit_books />
          </Route>

          <Route exact path="/forms/faculty/chapters_contributed">
            <Chapters_contributed />
          </Route>

          <Route exact path="/forms/faculty/chapters_contributed/edit">
            <Edit_chapters />
          </Route>

          <Route exact path="/forms/faculty/conference_proceeding">
            <Conference_proceeding />
          </Route>

          <Route exact path="/forms/faculty/conference_proceeding/edit">
            <Edit_confep />
          </Route>

          <Route exact path="/forms/faculty/paper_presentation">
            <Paper_presentation />
          </Route>

          <Route exact path="/forms/faculty/paper_presentation/edit">
            <Edit_paper />
          </Route>

          <Route exact path="/forms/faculty/journal_publications">
            <Journal_publications />
          </Route>

          <Route exact path="/forms/faculty/journal_publications/edit">
            <Edit_journal />
          </Route>

          <Route exact path="/forms/faculty/conference">
            <Conferences />
          </Route>

          <Route exact path="/forms/faculty/conference/edit">
            <Edit_conferene />
          </Route>

          <Route exact path="/forms/faculty/resource_person">
            <Resource_person />
          </Route>

          <Route exact path="/forms/faculty/resource_person/edit">
            <Edit_resource /> 
          </Route>

          <Route exact path="/forms/faculty/financial_support">
            <Financial_support />
          </Route>

          <Route exact path="/forms/faculty/financial_support/edit">
            <Edit_financial />
          </Route>

          <Route exact path="/forms/faculty/development_programmes">
            <Development_programmes />
          </Route>

          <Route exact path="/forms/faculty/development_programmes/edit">
            <Edit_development />
          </Route>

          <Route exact path="/forms/faculty/online_courses">
            <Online_courses />
          </Route>

          <Route exact path="/forms/faculty/online_courses/edit">
            <Edit_onlinecourses />
          </Route>

          <Route exact path="/forms/faculty/e_content">
            <E_content />
          </Route>

          <Route exact path="/forms/faculty/e_content/edit">
            <Edit_econtent />
          </Route>

          {/* Students Details */}

          <Route exact path="/forms/student/placements">
            <Placements />
          </Route>

          <Route exact path="/forms/student/placements/edit">
            <Edit_Placements />
          </Route>

          <Route exact path="/forms/student/s_publications">
            <Publications />
          </Route>

          <Route exact path="/forms/student/s_publications/edit">
            <Edit_publi />
          </Route>

          <Route exact path="/forms/student/paper_presentation">
            <SPpr />
          </Route>          

          <Route exact path="/forms/student/paper_presentation/edit">
            <Edit_Paper_presentation />
          </Route>

          <Route exact path="/forms/student/s_conference">
            <SConference />
          </Route>        

          <Route exact path="/forms/student/s_conference/edit">
            <Edit_conf />
          </Route>

          <Route exact path="/forms/student/s_competition">
            <SComp />
          </Route>     

          <Route exact path="/forms/student/s_competition/edit">
            <Edit_compet />
          </Route>

          <Route exact path="/forms/student/s_training">
            <STraining />
          </Route>     

          <Route exact path="/forms/student/s_training/edit">
            <Edit_Trai />
          </Route>

          <Route exact path="/forms/student/s_projectwork">
            <SPrjct />
          </Route>  

          <Route exact path="/forms/student/s_projectwork/edit">
            <Edit_prj />
          </Route>

          <Route exact path="/forms/student/s_exams">
            <SExams />
          </Route>  

          <Route exact path="/forms/student/s_exams/edit">
            <Edit_exms />
          </Route>

          <Route exact path="/forms/student/s_onlinecourses">
            <SOncou />
          </Route>

          <Route exact path="/forms/student/s_onlinecourses/edit">
            <Edit_onc />
          </Route>

          <Route exact path="/forms/student/s_achievements">
            <SAchiv />
          </Route>

          <Route exact path="/forms/student/s_achievements/edit">
            <Edit_achiv />
          </Route>
          
          <Route exact path="/logout">
            <Logout />
          </Route>
          
          <Route component={Not} />
        </Switch>
      </Router>
    )
  }
  var [bar,setBar] = useState(false)
  return (
    <div className="App">
      <AppContext.Provider value={{bar,setBar}}>
        <Routing />
      </AppContext.Provider>
    </div>
  );
}     

export default App;
