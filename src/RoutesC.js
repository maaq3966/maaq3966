import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { Redirect, useHistory } from "react-router";
import Layout from "./Layout";
import Content from "./Content";
import ShowContent from "./ShowContent";
import EditContent from "./EditContent";
import AddPage from "./Page";
import GetPage from "./GetPage";



const RoutesC = (props) => {
     
    return (
        <div>
         
            
            <Switch>


                {/* <Public exact path ='/login' component ={Login} /> */}
                <Public exact path='/register' name="Login Page" component={<Register {...props} />} />
                <Public exact path='/login' name="Login Page" component={<Login {...props} />} />
                <Private exact path='/' name="Dashboard Page" component={<Dashboard {...props} />} />
                <Private exact path='/dashboard' name="Dashboard Page" component={<Dashboard {...props} />} />
                <Private path='/content' name="Content Page" component={<Content {...props} />} />
                <Private path='/show-content'  component={<ShowContent {...props} />} />
                <Private path='/edit-content'  component={<EditContent {...props} />} />
                <Private path='/page'  component={<AddPage {...props} />} />
                <Private path='/show-pages'  component={<GetPage {...props} />} />
                

            </Switch>
           
          
        </div>
    )
}

function checkToken(){
    let token = localStorage.getItem('token')
    let token_set = false;
    if (token) {
        token_set = true
    }
    return token_set;
}

const Public = ({ component: Component, ...rest }) => {
   const token_set = checkToken()
    return (
        <div>

            {!token_set ? Component : <Redirect to='/dashboard'></Redirect>}
        </div>
    );
}

const Private = ({ component: Component, ...rest }) => {

    const token_set = checkToken()

    return (
        <div>

            {token_set ? <Layout {...rest} componentToShow={Component} /> : <Redirect to='/login'></Redirect>}

        </div>
    );
}

export default RoutesC