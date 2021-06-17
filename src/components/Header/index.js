import './header.css';

function Header(props){
    function searchIcon(){
        if(props.searchTab === false) {
            props.setSearchTab(true)
        } else {
            props.setSearchTab(false)
        }
    }
    return (
        <header>
            <div className="container-header">
                <div className="flex-container">
                    <div className="logo">SUNO</div>
                    <div className="logo">MOVIES</div>
                </div>
                <div className="menu">
                    <img src="" alt="" />
                    <a href="/"><div className="">INÍCIO</div> </a>
                    <a href="#full-catalog"><div className="">CATÁLOGO</div> </a>
                    <div className="search-icon" onClick={searchIcon}><i className={ props.searchTab === true ? 'fas fa-search active-icon' : 'fas fa-search' } ></i></div>
                </div>
            </div>
        </header>
    )
}

export default Header
