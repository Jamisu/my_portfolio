import './SortButton.scss'

const SortButton = ({sort, setSort}) => {

    const clickHandler = e => {
        sort === 'asc' ? setSort('desc') : setSort('asc');
    }

    return <button className='sort_button' onClick={clickHandler}>
        <div className={sort==='desc' ? 'active' : 'inactive'}>oldest</div>
        <div> | </div>
        <div className={sort==='asc' ? 'active' : 'inactive'}>newest</div>
    </button> 
}

export default SortButton