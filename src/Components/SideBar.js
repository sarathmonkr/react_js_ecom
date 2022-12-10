import { Link } from 'react-router-dom'

const SideBar = () => {
    
    return (
            <div className='bg-primary'>
            
                <ul className='w-100 d-flex justify-content-center'>
                    <Link to='/' className='btn btn-primary m-2 px-4 text-light text-decoration-none'>List</Link>
                    <Link to='additem' className='btn btn-primary m-2 text-light text-decoration-none'>Add Item</Link>
                    <Link to='cart' className='btn btn-primary m-2 px-4 text-light text-decoration-none'>Cart</Link>
                </ul>
            </div>
    )

}
export default SideBar;