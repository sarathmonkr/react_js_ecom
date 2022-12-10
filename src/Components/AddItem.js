import { useEffect, useState } from "react"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddItem = () => {
    const [selectedFile, setSelectedFile] = useState("");
    const [name, setName] = useState("");
    const [descr, setDescr] = useState("");
    const [price, setPrice] = useState("");
    // console.log(selectedFile,name,descr,price);
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
                // console.log(response.data.message);
                // window.alert(response.data.message);
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

    // console.log(selectedFile);
    return (
        <>
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                {itemAdded && <div className="alert alert-secondary w-100 text-center" role="alert">
                    Item added ✔
                </div>}
                {error && <div className="alert alert-danger w-100 text-center" role="alert">
                    Unexpected Error Occured ❌
                </div>}
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