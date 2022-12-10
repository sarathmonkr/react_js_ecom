import { useEffect, useState } from "react"
import axios from "axios";
import { Container } from "react-bootstrap";

const List = () => {
    const [itemsData, setItemsData] = useState();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/list').then((res) => {

            res.data.data.length == 0 ?
                setItemsData(null) : setItemsData(res.data.data);
            setLoading(false)
        })
    }, []);
    const addCart=(id)=>{
        axios.get(`http://127.0.0.1:8000/api/list/${id}`).then((res) => {

           console.log(res);
        })
    }
    // console.log(itemsData);
    return (
        <Container className="vh-100">
            <div className="row">
                {!itemsData && <div className="card py-2 text-center">
                    <p>{loading ? 'Loading...' : 'No data to show'}</p>
                </div>}
                {itemsData && itemsData.map((item, index) => {
                    return (
                        <div className="col-12 col-sm-4 col-md-3 p-1" key={index}>
                            <div className="card bg-light p-2 pb-2" style={{}} >
                                <div style={{}} >
                                    <img src={item?.img ? `http://127.0.0.1:8000/storage/${item.img.slice(7)}` : null} alt="" style={{ height: '250px', width: '100%', objectFit: 'cover' }} />
                                </div>
                                <h2 >{item.name}</h2>
                                <h6>Price:{item.price}</h6>
                                <p>{item.descr}</p>
                                <button className="btn btn-primary" onClick={()=>addCart(item.id)}>Add to Cart</button>
                            </div>
                        </div>
                    )
                })}
            </div>

        </Container>
    )
}
export default List