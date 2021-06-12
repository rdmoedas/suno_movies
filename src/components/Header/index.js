import './header.css'

function Header(){
    return (
        <header>
            <div className="header-container">
                <div className="flex-container">
                    <div className="logo">SUNO</div>
                    <div className="logo">MOVIES</div>
                </div>
                <div className="menu flex-container">
                    <div className="">INÍCIO</div> 
                    <div className="active">CATÁLOGO</div> 
                    <div><i className="fas fa-search"></i></div>
                </div>
            </div>
        </header>
    )
}

export default Header
