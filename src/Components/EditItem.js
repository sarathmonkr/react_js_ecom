import { useEffect, useState } from "react"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
    const [itemsData, setItemsData] = useState({
        "name": "",
        "descr": "",
        "price": "",
        "img": ""
    });
    const navigate = useNavigate()
    const [fileSelectd, setFileSelected] = useState(false);
    const [selectedFile, setSelectedFile] = useState(itemsData?.img);
    const [name, setName] = useState(itemsData?.name);
    const [descr, setDescr] = useState(itemsData?.descr);
    const [price, setPrice] = useState(itemsData?.price);
    const [loading, setLoading] = useState(false)
    const [itemAdded, setItemAdded] = useState(false)
    const [error, setError] = useState(false)
    const location = useLocation();
    useEffect(() => {
        setSelectedFile(itemsData?.img);
        setName(itemsData?.name);
        setDescr(itemsData?.descr);
        setPrice(itemsData?.price);
    },[itemsData])
    useEffect(() => {
        setLoading(true)
        axios.get(`http://127.0.0.1:8000/api/list/${location.state.id}`).then((res) => {

            res.data.data.length == 0 ?
                setItemsData(null) : setItemsData(res.data.data);
            setLoading(false)
        })
    }, [location.state.id]);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setError(false)
            setItemAdded(false)
        }, 4000);
        return () => {
            clearInterval(intervalId);
        };
    }, [error, itemAdded])


    async function handleSubmit(event) {
        setLoading(true)
        event.preventDefault()
        const formData = new FormData();
        formData.append('id', location.state.id)
        formData.append('name', name)
        formData.append('descr', descr)
        formData.append('price', price)
       if(fileSelectd)
       {
        formData.append('img', selectedFile)
       }
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/update',
            data: formData
        })
            .then(function (response) {
                setSelectedFile('')
                setName('')
                setDescr('')
                setPrice('')
                setItemAdded(true)
                // 
                setTimeout(()=>navigate('../'), 3000);
            })
            .catch(function (error) {
                // window.alert('Unexpected Error Occured');
                setLoading(false)
                setError(true)
            });

    }
    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0])
    }
    return (
        <>
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                {itemAdded && <Alert message="Item Updated Successfuly ✔" />}
                {error && <Alert message=" Unexpected Error Occured ❌" />}

                <form onSubmit={handleSubmit} className="border p-3 bg-light " style={{ maxWidth: '300px' }}>
                    <h1 className="text-center">Add Item</h1>
                    <div className="d-flex flex-column form-group" >
                        <label >Title</label>
                        <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="d-flex flex-column form-group">
                        <label >Description</label>
                        <input type="text" name="descr" value={descr} onChange={(e) => { setDescr(e.target.value) }} />
                    </div>
                    <div className="d-flex flex-column">
                        <label >Price</label>
                        <input type="text" name="price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    </div>
                    <div className="d-flex flex-column">
                        <label >Photo</label>
                        <input type="file" name="img" onChange={handleFileSelect} />
                    </div>
                    <div className="d-flex flex-column my-3">
                        <button type="submit" className="btn btn-primary" disabled={loading ? true : false}>Submit</button>
                    </div>

                </form>
            </div>
        </>
    );
}
export default AddItem