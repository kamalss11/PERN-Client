import React, { useState } from 'react';
import './CSS/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
import Adminlogin from './Admin/Login';
import Student_dashboard from './Pages/Student_dashboard';
import Edit_publication from './Forms/Publications/Edit_publication';
import Publication from './Forms/Publications/publication';
import Achievement from './Forms/Publications/achievement';
import Edit_achievement from './Forms/Publications/Edit_achievement';
import Forget_Password from './Pages/Forget_password';
import Reset_password from './Pages/Reset_password';

function App() {
  const Routing = ()=>{
    return(
      <Router>
        <Switch>
          <Route exact path="/">
            <Signup />
          </Route>
          
          <Route path="/signin"> 
            <Signin />
          </Route>

          <Route exact path="/dashboard">
            <Dashboard />
          </Route>

          <Route exact path="/forget_password">
            <Forget_Password />
          </Route>

          <Route path="/reset_password">
            <Reset_password />
          </Route>

          <Route exact path="/student_dashboard">
            <Student_dashboard />
          </Route>

          <Route path="/dashboard/profile">
            <Profile />
          </Route>

          <Route path="/dashboard/editprofile">
            <Editprofile />
          </Route>

          {/* Research */}

          <Route exact path="/forms/research/research_projects">
            <Researchprojects />
          </Route>

          <Route path="/forms/research/research_projects/edit">
            <Edit_research_projects />
          </Route>

          <Route exact path="/forms/research/patents">
            <Patents />
          </Route>

          <Route path="/forms/research/patents/edit">
            <Edit_patents />
          </Route>

          <Route exact path="/forms/research/awards_for_innovation">
            <Awards />
          </Route>

          <Route path="/forms/research/awards_for_innovation/edit">
            <Edit_awards />
          </Route>

          <Route exact path="/forms/research/deg">
            <Deg />
          </Route>

          <Route path="/forms/research/deg/edit">
            <Edit_phd />
          </Route>

          <Route exact path="/forms/research/fellowship">
            <Fellowship />
          </Route>

          <Route path="/forms/research/fellowship/edit">
            <Edit_fellowship />
          </Route>

          {/* Collaborations */}

          <Route exact path="/forms/collaborations/collaborative_activities">
            <Activities />
          </Route>

          <Route path="/forms/collaborations/collaborative_activities/edit">
            <Edit_activities />
          </Route>

          <Route exact path="/forms/collaborations/linkages">
            <Linkages />
          </Route>

          <Route path="/forms/collaborations/linkages/edit">
            <Edit_linkages />
          </Route>

          <Route exact path="/forms/collaborations/mou">
            <Mou />
          </Route>

          <Route path="/forms/collaborations/mou/edit">
            <Edit_mou />
          </Route>

          {/*EVENTS/PROGRAMMES/VISITS ORGANIZED  */}

          <Route exact path="/forms/events/conference">
            <Conference />
          </Route>

          <Route path="/forms/events/conference/edit">
            <Edit_conference />
          </Route>

          <Route exact path="/forms/events/guest_lectures">
            <Lectures />
          </Route>

          <Route path="/forms/events/guest_lectures/edit">
            <Edit_lectures />
          </Route>

          <Route exact path="/forms/events/extension_activities">
            <Extension />
          </Route>

          <Route path="/forms/events/extension_activities/edit">
            <Edit_extension />
          </Route>

          <Route exact path="/forms/events/industrial_visits">
            <Visits />
          </Route>

          <Route path="/forms/events/industrial_visits/edit">
            <Edit_visits />
          </Route>

          <Route exact path="/forms/events/evs">
            <Evs />
          </Route>

          <Route path="/forms/events/evs/edit">
            <Edit_evs />
          </Route>

          <Route exact path="/forms/events/departmental_activities">
            <Departmental />
          </Route>

          <Route path="/forms/events/departmental_activities/edit">
            <Edit_departmental />
          </Route>

          {/* Consultancy */}

          <Route exact path="/forms/consultancy/projects_services">
            <Projects_services />
          </Route>

          <Route path="/forms/consultancy/projects_services/edit">
            <Edit_pro />
          </Route>

          {/* Faculties */}

          <Route exact path="/forms/faculty/honours">
            <Honours />
          </Route>

          <Route path="/forms/faculty/honours/edit">
            <Edit_honours />
          </Route>

          <Route exact path="/forms/faculty/exams">
            <Exams />
          </Route>

          <Route path="/forms/faculty/exams/edit">
            <Edit_exams />
          </Route>

          <Route exact path="/forms/faculty/books_published">
            <Books_published />
          </Route>

          <Route path="/forms/faculty/books_published/edit">
            <Edit_books />
          </Route>

          <Route exact path="/forms/faculty/chapters_contributed">
            <Chapters_contributed />
          </Route>

          <Route path="/forms/faculty/chapters_contributed/edit">
            <Edit_chapters />
          </Route>

          <Route exact path="/forms/faculty/conference_proceeding">
            <Conference_proceeding />
          </Route>

          <Route path="/forms/faculty/conference_proceeding/edit">
            <Edit_confep />
          </Route>

          <Route exact path="/forms/faculty/paper_presentation">
            <Paper_presentation />
          </Route>

          <Route path="/forms/faculty/paper_presentation/edit">
            <Edit_paper />
          </Route>

          <Route exact path="/forms/faculty/journal_publications">
            <Journal_publications />
          </Route>

          <Route path="/forms/faculty/journal_publications/edit">
            <Edit_journal />
          </Route>

          <Route exact path="/forms/faculty/conference">
            <Conferences />
          </Route>

          <Route path="/forms/faculty/conference/edit">
            <Edit_conferene />
          </Route>

          <Route exact path="/forms/faculty/resource_person">
            <Resource_person />
          </Route>

          <Route path="/forms/faculty/resource_person/edit">
            <Edit_resource /> 
          </Route>

          <Route exact path="/forms/faculty/financial_support">
            <Financial_support />
          </Route>

          <Route path="/forms/faculty/financial_support/edit">
            <Edit_financial />
          </Route>

          <Route exact path="/forms/faculty/development_programmes">
            <Development_programmes />
          </Route>

          <Route path="/forms/faculty/development_programmes/edit">
            <Edit_development />
          </Route>

          <Route exact path="/forms/faculty/online_courses">
            <Online_courses />
          </Route>

          <Route path="/forms/faculty/online_courses/edit">
            <Edit_onlinecourses />
          </Route>

          <Route exact path="/forms/faculty/e_content">
            <E_content />
          </Route>

          <Route path="/forms/faculty/e_content/edit">
            <Edit_econtent />
          </Route>

          <Route path="/forms/publication/publications">
            <Publication />
          </Route>

          <Route path="/forms/publication/publications/edit">
            <Edit_publication />
          </Route>

          <Route path="/forms/achievement/achievements">
            <Achievement />
          </Route>

          <Route path="/forms/achievement/achievements/edit">
            <Edit_achievement />
          </Route>

          <Route exact path="/admin">
            <Adminlogin />
          </Route>

          <Route path="/logout">
            <Logout />
          </Route>
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
