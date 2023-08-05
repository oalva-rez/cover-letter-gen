import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";

function App() {
    const [inputData, setInputData] = useState({
        name: "",
        jobTitle: "",
        company: "",
        jobDesc: "",
    });
    const [coverLetterData, setCoverLetterData] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const API_URL = "http://localhost:3000";

    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.id]: e.target.value });
    };
    const validateInput = () => {
        const { name, jobTitle, company, jobDesc } = inputData;
        if (name && jobTitle && company && jobDesc) {
            return true;
        }
        alert("Please fill all the fields");
        return false;
    };
    const fetchCoverLetterData = async (body) => {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        setIsLoading(false);
        return data;
    };
    const handleGenerate = async () => {
        if (!validateInput()) return;
        const data = await fetchCoverLetterData(inputData);
        setCoverLetterData(data.coverLetter);
    };

    return (
        <div className="modal-container">
            <h1>A.I Cover Letter Generator</h1>
            <div className="main-content">
                <div className="user-inputs">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={inputData.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="jobTitle">Job Title</label>
                    <input
                        type="text"
                        id="jobTitle"
                        value={inputData.jobTitle}
                        onChange={handleChange}
                    />
                    <label htmlFor="company">Company Name</label>
                    <input
                        type="text"
                        id="company"
                        value={inputData.company}
                        onChange={handleChange}
                    />
                    <label htmlFor="jobDesc">Job Description</label>
                    <textarea
                        id="jobDesc"
                        value={inputData.jobDesc}
                        onChange={handleChange}
                        rows={7}
                    />
                    <input
                        type="submit"
                        className="button"
                        onClick={handleGenerate}
                        value="Generate"
                    />
                </div>
                <div className="cover-letter-data">
                    {isLoading ? (
                        <div className="loader">
                            <RingLoader color="#7199ff" />
                        </div>
                    ) : (
                        coverLetterData
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
