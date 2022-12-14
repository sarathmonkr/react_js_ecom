import { useEffect, useState } from "react"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from "./Alert";

const AddItem = () => {
    const [selectedFile, setSelectedFile] = useState("");
    const [name, setName] = useState("");
    const [descr, setDescr] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false)
    const [itemAdded, setItemAdded] = useState(false)
    const [error, setError] = useState(false)
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
        formData.append('name', name)
        formData.append('descr', descr)
        formData.append('price', price)
        formData.append('img', selectedFile)
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/add',
            data: formData
        })
            .then(function (response) {
                setSelectedFile('')
                setName('')
                setDescr('')
                setPrice('')
                setLoading(false)
                setItemAdded(true)
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
            <div className="w-100 mt-5 d-flex flex-column align-items-center" >
                {itemAdded && <Alert message="Item Added ✔" />}
                {error && <Alert message=" Unexpected Error Occured ❌" />}

                <form onSubmit={handleSubmit} className="border p-3 bg-light " style={{ maxWidth: '300px' }}>
                    <h1 className="text-center pb-2">Add Item</h1>
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