import React from 'react'
import { useRef, useState, useEffect } from 'react'

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    // useEffect(() => {
    //   let passwordArray = localStorage.setItem("passwords")
    //   if(passwords){
    //     passwordArray = JSON.parse("passwords")
    //   }
    // }, [])

    useEffect(() => {
        let storedPasswords = localStorage.getItem("passwords");
        if (storedPasswords) {
            setpasswordArray(JSON.parse(storedPasswords));
        }
    }, []);

    const handleDeleteItem = (e) => {
        const newItems = passwordArray.filter((_, i) => i !== e);
        setpasswordArray(newItems);
    }


    const changeIcon = () => {
        passwordRef.current.type = "password"
        if (ref.current.src.includes("hide.png")) {
            alert("Are you sure to see password!")
            ref.current.src = "view.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "hide.png";
        }
    }

    const handleDelete = () => {
        setpasswordArray([])
        savePassword()
    }

    const savePassword = () => {
        const newPasswords = [...passwordArray, form];
        setpasswordArray(newPasswords);
        localStorage.setItem("passwords", JSON.stringify(newPasswords));
        console.log(newPasswords);
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleRefresh = () => {
        window.location.reload();
    }

    const handleCopy = (e) => {
        let password = e.password
        window.clipboardData.setData(password, 'Password Copied to Clipboard!')}

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-300 opacity-20 blur-[100px]"></div>
            </div>
            <div className="mycontainer">
                <h1 className='text-black text-3xl font-bold text-center'>
                    <span className='text-green-500'>
                        &lt;
                    </span>
                    <span className='text-black'>PassOp/</span>
                    <span className='text-green-500'>&gt;
                    </span>
                </h1>
                <p className='text-center'>Your own password manager</p>
                <div className="text-white flex flex-col p-4 gap-8">
                    <input onChange={handleChange} value={form.site} name='site' placeholder='Enter the URL' className='text-black rounded-full border p-4 py-1 border-green-600' type="text" />
                    <div className="text-white justify-between flex w-full gap-8">
                        <input onChange={handleChange} value={form.username} name='username' placeholder='Enter the Username' className='text-black rounded-full border w-2/3 p-4 py-1 border-green-600' type="text" />
                        <div className="relative">
                            <input ref={passwordRef} onChange={handleChange} value={form.password} name='password' placeholder='Enter the Password' className='text-black rounded-full border w-full p-4 py-1 border-green-600' type="text" />
                            <span className='absolute right-[3px] top-[4px]'>
                                <img ref={ref} onClick={changeIcon} className='p-1' width={25} src="hide.png" alt="" />
                            </span>

                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={savePassword} className='flex justify-center items-center gap-2 rounded-full w-1/4 h-10 border bg-green-700 border-green-800 hover:bg-green-600'>
                            <img class="w-5 h-5" src="plus.png" alt="" />
                            <div className='flex'>Add Password</div>
                        </button>
                    </div>
                </div>

                <div className='passwords'>
                    <div className='flex items-center'>
                        <h2 className='text-2xl font-bold text-green-900 py-3 '>
                            Your Passwords
                        </h2>
                        <div className='px-10 gap-1'>
                            <button onClick={handleRefresh} className='px-2 py-1 bg-black border rounded-xl text-[13px] text-white font-semibold'>
                                Refresh
                            </button>
                            <button onClick={handleDelete} className='px-2 py-1 bg-black border rounded-xl text-[13px] text-white font-semibold'>
                                Delete All
                            </button>
                        </div>
                    </div>
                    {passwordArray.length === 0 && <div> No passwords to show </div>}
                    {passwordArray.length != 0 && <table className='table-auto w-full rounded-md overflow-hidden'>
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Website</th>
                                <th className='py-2'>Usernames</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Edit</th>
                            </tr>
                        </thead>

                        <tbody>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='bg-green-100 text-center py-2 border border-white w-50'>{item.site}</td>
                                    <td className='bg-green-100 text-center py-2 border border-white w-50'>{item.username}</td>
                                    <td className='bg-green-100 text-center py-2 border border-white w-50'>
                                        {'*'.repeat(item.password.length)}
                                    </td>
                                    {/* <td className='flex bg-transparent justify-center align-baseline w-15 gap-2 px-2 py-2'>
                                        <img className='w-4 h-4' src="/editing.png" alt="" />
                                        <img className='w-4 h-4' src="/delete.png" alt="" />
                                    </td> */}
                                    <td className='bg-green-100 text-center py-2 border border-white w-50'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <img className='w-4 h-4' src="/editing.png" alt="" />
                                            <img onClick={() => handleDeleteItem(index)} className='w-4 h-4' src="/delete.png" alt="" />
                                            <img onClick={()=> handleCopy(index)} className='w-4 h-4' src="/copy.png" alt="" />
                                        </div>
                                    </td>
                                </tr>
                            }
                            )}

                        </tbody>
                    </table>

                    }
                </div>
            </div>
        </>
    )
}

export default Manager
