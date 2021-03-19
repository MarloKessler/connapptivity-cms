import './style.css'
import { Switch, Route } from "react-router-dom"

import Sidebar from "./views/Sidebar"
import SiteView from "./views/SiteView"

import { PostsOverview, PostEditView } from "../BlogApp"
import { PagesOverview, PagesEditView } from "../PagesApp"
import { StaffApp } from "../StaffApp"
import { MediaCenter } from "../MediaCenter"
import { LoadingErrorView } from "../../shared/util-elements"


export default App


function App() {
  return (
    <div className="App">
      <Sidebar/>
      <div className="Content">
        <Switch>
          <Route exact path={ process.env.REACT_APP_PATH_HOME } component={ SiteView }/>
          <Route exact path={ process.env.REACT_APP_PATH_POSTSOVERVIEW } component={ PostsOverview }/>
          <Route exact path={`${process.env.REACT_APP_PATH_POSTSOVERVIEW}/:postID`} component={ PostEditView }/>
          <Route exact path={ process.env.REACT_APP_PATH_PAGESOVERVIEW } component={ PagesOverview }/>
          <Route exact path={`${process.env.REACT_APP_PATH_PAGESOVERVIEW}/:pagesID`} component={ PagesEditView }/>
          <Route exact path={ process.env.REACT_APP_PATH_AUTHORSOVERVIEW } component={ StaffApp }/>
          <Route exact path={ process.env.REACT_APP_PATH_MEDIA_CENTER } component={ MediaCenter }/>
          <Route path="*" component={ () => <LoadingErrorView message="Die Seite, die Du suchst, wurde nicht gefunden." link={ process.env.REACT_APP_PATH_HOME } linkMessage="Home"/> }/>
        </Switch>
      </div>
    </div>
  )
}