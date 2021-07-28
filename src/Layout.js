import Header from "./Header"
import Menu from "./Menu"
import Footer from "./Footer";

const Layout =({componentToShow: componentToShow, ...rest}) =>{
return(
<div>

<Menu />
<Header />

<div className="content-wrapper">
    {componentToShow}
</div>


<Footer />
</div>

);

}

export default Layout;