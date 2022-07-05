import './index.scss'

const Footer = (props) => {
    const day = props.mode;
    return(<div className={"footer " + day}>CHAOTEC CO.  2022  all rights reserved</div>)
}

export default Footer