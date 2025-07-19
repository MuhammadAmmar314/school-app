import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const showConfirmToast = (message, onConfirm) => {
    toast(
        ({ closeToast }) => (
            <div>
                <p>{message}</p>
                <div className="d-flex justify-content-end mt-2">
                    <button 
                        onClick={() => {
                            onConfirm();
                            closeToast();
                        }}
                        className="btn btn-danger btn-sm me-2"
                    >
                        Ya
                    </button>
                    <button onClick={closeToast} className="btn btn-secondary btn-sm">Batal</button>
                </div>
            </div>
        ),
        {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            closeButton: false,
            className: 'w-auto'
        }
    );
    toast()
};