import { useState, useRef, useCallback } from "react";
import { toPng } from 'html-to-image'; //html-to-image library 
import image from "./image.jpg"



function App() {

    // Prevent refresh page after submit the form
    const submit = (e) => {
      e.preventDefault();
    };
  
    const [name, setNeme] = useState({
      studentName: ""
    });
  

  function handelChange(e) {
    const { name, value } = e.target;
    setNeme((prevName) => ({
      ...prevName,
      [name]: value,
    }));
  }

   //  Download Certificate image
  const ref = useRef(null)

  const onButtonClick = useCallback(() => {

    const ccb = localStorage.getItem("claim-certificate-before");

    if (ref.current === null || ccb === "true") {
      return
    }

    ref.current.style.filter = "none"
    document.querySelector(".float").style.display = "none"
    document.querySelector("p").style.display = "none"

    localStorage.setItem("claim-certificate-before", "true");

    toPng(ref.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'my-image-name.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])



  return (
    <main>

      <div className="certificate-container" ref={ref}>
        <img src={image} alt="certificate" />
        <div className="name-text">{name.studentName}</div>
      </div>


      <form onSubmit={submit} className='float'>
        <input onChange={handelChange} name="studentName" value={name.studentName} type="text" placeholder='Enter your full name' />
        <button onClick={onButtonClick}>
            <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-download"
          viewBox="0 0 16 16"
        >
          <path d="M.5 9.9a.5.5 0 01.5.5v2.5a1 1 0 001 1h12a1 1 0 001-1v-2.5a.5.5 0 011 0v2.5a2 2 0 01-2 2H2a2 2 0 01-2-2v-2.5a.5.5 0 01.5-.5z"></path>
          <path d="M7.646 11.854a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 10.293V1.5a.5.5 0 00-1 0v8.793L5.354 8.146a.5.5 0 10-.708.708l3 3z"></path>
            </svg>
        </button>
      </form>
        <p>تأكد من كتابة الاسم كامل بشكل صحيح, لن تتمكن من المطالبة بالشهادة مرة أخرة</p>

    </main>
  );
}

export default App;
