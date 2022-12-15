import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

const Cart = () => {
    const [itemsData, setItemsData] = useState();
    const [isData, setIsData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(false);

    const addCart = (id) => {
        axios.get(`http://127.0.0.1:8000/api/addcart/${id}`).then((res) => {
            setCart(true)
            setCart(false)
        })
    }
    const remCart = (id) => {
        setCart(true)
        axios.get(`http://127.0.0.1:8000/api/remcart/${id}`).then((res) => {
            setCart(false)
        })
    }
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/list").then((res) => {
            res.data.data.length == 0
                ? setItemsData(null)
                : setItemsData(res.data.data);
            setLoading(false);
        });
    }, [cart]);
    return (
        <Container>
            <div>
                <h3>Cart</h3>
            </div>
            {!itemsData && <div className="card py-2 text-center">
                    <p>{loading ? 'Loading...' : 'No data to show'}</p>
                </div>}
            <div className="d-flex justify-content-end">
               {isData? <button className="btn btn-primary">Buy Now</button> : <h6 className="text-center"> {!loading && 'No Products added to cart'}</h6>}
            </div>
            <div>
                {itemsData?.map((item,index) => {
                    if (item.status > 0) {
                        !isData && setIsData(true)
                        return (
                            <div className="card d-flex flex-row p-1 m-2" key={index}>
                                <div>
                                    <img
                                        src={
                                            item?.img
                                                ? `http://127.0.0.1:8000/storage/${item.img.slice(7)}`
                                                : null
                                        }
                                        alt=""
                                        style={{ height: "70px", width: "70px", objectFit: "cover" }}
                                    />
                                </div>
                                <div className="d-flex flex-row justify-content-evenly w-100">
                                    <div className="text-center d-flex align-items-center h6">{item.name}</div>
                                    <div className="text-center d-flex align-items-center">Rate: {item.status > 0 ? (item.price) * (item.status) : item.price}</div>
                                    <div className="text-center d-flex align-items-center h6 btn-group">
                                        <button className="btn btn-primary " onClick={() => remCart(item.id)}>-</button>
                                        <button className="btn btn-primary ">{item.status}</button>
                                        <button className="btn btn-primary " onClick={() => addCart(item.id)}>+</button>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </Container>
    );
};
export default Cart;
